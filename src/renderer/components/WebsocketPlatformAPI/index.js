// @flow

import { useJSONRPCServer } from "@ledgerhq/live-common/lib/platform/JSONRPCServer";
import { JSONRPCRequest } from "json-rpc-2.0";
import { remote, ipcRenderer } from "electron";

import {
    accountToPlatformAccount,
    currencyToPlatformCurrency,
  } from "@ledgerhq/live-common/lib/platform/converters";
  
import type {
RawPlatformTransaction,
RawPlatformSignedTransaction,
} from "@ledgerhq/live-common/lib/platform/rawTypes";

import {
serializePlatformAccount,
deserializePlatformTransaction,
serializePlatformSignedTransaction,
deserializePlatformSignedTransaction,
} from "@ledgerhq/live-common/lib/platform/serializers";

import { listSupportedCurrencies } from "@ledgerhq/live-common/lib/currencies";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge/index";
import { getEnv } from "@ledgerhq/live-common/lib/env";
import { addPendingOperation } from "@ledgerhq/live-common/lib/account/pending";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "@ledgerhq/live-common/lib/notifications/ToastProvider/index";
import { accountsSelector } from "~/renderer/reducers/accounts";
import { useTranslation } from "react-i18next";

export function WebsocketPlatformAPI() {
  const clientRef = useRef<Websocket | null>(null)
  const dispatch = useDispatch();
  const accounts = useSelector(accountsSelector);
  const currencies = useMemo(() => listSupportedCurrencies(), []);
  const { t } = useTranslation();
  const { pushToast } = useToasts();

  const listAccounts = useCallback(() => {
    return accounts.map(account => serializePlatformAccount(accountToPlatformAccount(account)));
  }, [accounts]);

  const listCurrencies = useCallback(() => {
    return currencies.map(currencyToPlatformCurrency);
  }, [currencies]);

  const receiveOnAccount = useCallback(
    ({ accountId }: { accountId: string }) => {
      const account = accounts.find(account => account.id === accountId);

      return new Promise((resolve, reject) =>
        dispatch(
          openModal("MODAL_EXCHANGE_CRYPTO_DEVICE", {
            account,
            parentAccount: null,
            onResult: account => resolve(account.freshAddress),
            onCancel: reject,
            verifyAddress: true,
          }),
        ),
      );
    },
    [accounts, dispatch],
  );

  const broadcastTransaction = useCallback(
    async ({
             accountId,
             signedTransaction,
           }: {
      accountId: string,
      signedTransaction: RawPlatformSignedTransaction,
    }) => {
      const account = accounts.find(account => account.id === accountId);
      if (!account) return null;

      const signedOperation = deserializePlatformSignedTransaction(signedTransaction, accountId);
      const bridge = getAccountBridge(account);

      const optimisticOperation = !getEnv("DISABLE_TRANSACTION_BROADCAST")
        ? await bridge.broadcast({
          account,
          signedOperation,
        })
        : signedOperation.operation;

      dispatch(
        updateAccountWithUpdater(account.id, account =>
          addPendingOperation(account, optimisticOperation),
        ),
      );

      pushToast({
        id: optimisticOperation.id,
        type: "operation",
        title: t("platform.flows.broadcast.toast.title"),
        text: t("platform.flows.broadcast.toast.text"),
        icon: "info",
        callback: () => {
          dispatch(
            openModal("MODAL_OPERATION_DETAILS", {
              operationId: optimisticOperation.id,
              accountId: account.id,
              parentId: null,
            }),
          );
        },
      });

      return optimisticOperation.hash;
    },
    [accounts, pushToast, dispatch, t],
  );

  const requestAccount = useCallback(
    ({ currencies, allowAddAccount }: { currencies?: string[], allowAddAccount?: boolean }) => {
      return new Promise((resolve, reject) =>
        dispatch(
          openModal("MODAL_REQUEST_ACCOUNT", {
            currencies,
            allowAddAccount,
            onResult: account =>
              resolve(serializePlatformAccount(accountToPlatformAccount(account))),
            onCancel: reject,
          }),
        ),
      );
    },
    [dispatch],
  );

  const signTransaction = useCallback(
    ({
       accountId,
       transaction,
       params = {},
     }: {
      accountId: string,
      transaction: RawPlatformTransaction,
      params: any,
    }) => {
      const platformTransaction = deserializePlatformTransaction(transaction);

      const account = accounts.find(account => account.id === accountId);

      if (!account) return null;

      if (account.currency.family !== platformTransaction.family) {
        throw new Error("Transaction family not matching account currency family");
      }

      return new Promise((resolve, reject) =>
        dispatch(
          openModal("MODAL_SIGN_TRANSACTION", {
            transactionData: platformTransaction,
            useApp: params.useApp,
            account,
            parentAccount: null,
            onResult: signedOperation =>
              resolve(serializePlatformSignedTransaction(signedOperation)),
            onCancel: reject,
          }),
        ),
      );
    },
    [dispatch, accounts],
  );

  const handlers = useMemo(
        () => ({
          "account.list": listAccounts,
          "currency.list": listCurrencies,
          "account.request": requestAccount,
          "account.receive": receiveOnAccount,
          "transaction.sign": signTransaction,
          "transaction.broadcast": broadcastTransaction,
        }),
        [
          listAccounts,
          receiveOnAccount,
          signTransaction,
          broadcastTransaction,
          requestAccount,
          listCurrencies,
        ],
      );

  const handleSend = useCallback(
    (request: JSONRPCRequest) => {
      void ipcRenderer.invoke("platformSend", JSON.stringify(request));
    },
    [],
  );

  const [receive] = useJSONRPCServer(handlers, handleSend);

  useEffect(() => {
    ipcRenderer.on("platformReceive", (event, message) => {
      receive(JSON.parse(message))
    });
    // RECEIVE HERE
    return () => {
    }
  }, []);

  return null;
}

const test = {
  "id": 1,
  "jsonrpc": "2.0",
  "method": "signTransaction",
  "params": {
    "transaction": {
      "family": "ethereum",
      "recipient": "XXX",
      "amount": "1"
    },
    "params": {
      "useApp": "ethereum"
    }
  }
}
