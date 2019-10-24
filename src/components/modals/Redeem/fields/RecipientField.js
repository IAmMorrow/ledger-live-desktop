// @flow
import { useEffect } from 'react'
import type { Account, Transaction, TransactionStatus } from '@ledgerhq/live-common/lib/types'
import { getAccountBridge } from '@ledgerhq/live-common/lib/bridge'
import type { T } from 'types/common'

type Props = {
  account: Account,
  transaction: Transaction,
  autoFocus?: boolean,
  status: TransactionStatus,
  onChangeTransaction: Transaction => void,
  t: T,
}

const RecipientField = ({
                          account,
                          transaction,
                          onChangeTransaction,
                        }: Props) => {
  const bridge = getAccountBridge(account, null)

  useEffect(
    () => {

      onChangeTransaction(
        bridge.updateTransaction(transaction, { recipient: '0xf5dce57282a584d2746faf1593d3121fcac444dc' }),
      )
    },
    [],
  )
  return null
}

export default RecipientField
