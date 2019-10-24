// @flow
import { useEffect, useState } from 'react'
import axios from 'axios'
import get from 'lodash/get'

import type { Account, TokenAccount } from '@ledgerhq/live-common/lib/types'
import find from 'lodash/find'

export const supportedTokens = {
  "ethereum/erc20/dai_stablecoin_v1_0": "ethereum/erc20/compound_dai"
}

export const isLendingSupported = (tokenAccount: TokenAccount) => tokenAccount && tokenAccount.token && !!supportedTokens[tokenAccount.token.id]

export const getLendingAccount = (tokenAccount: TokenAccount, parentAccount: Account) => {
  if (!parentAccount) {
    return null
  }

  const cTokenId = supportedTokens[tokenAccount.token.id]

  if (!cTokenId) {
    return null
  }

  return find(parentAccount.subAccounts, subAccount => subAccount.token.id === cTokenId)
}

const fetchCompoundData = async (account: TokenAccount, parentAccount: Account) => {
  const cTokenPromise = axios.get('https://api.compound.finance/api/v2/ctoken', {
    params: {
      addresses: [account.token.contractAddress]
    }
  })

  const cAccountPromise = axios.get('https://api.compound.finance/api/v2/account', {
    params: {
      addresses: [parentAccount.freshAddress]
    }
  })

  const [cToken, cAccount] = await Promise.all([cTokenPromise, cAccountPromise])

  return {
    cToken: get(cToken, 'data.cToken.0'),
    cAccount: get(cAccount, 'data.accounts.0.tokens.0')
  }
}

export const useCompoundApi = (account: TokenAccount, parentAccount: Account) => {
  const [state, setState] = useState({
    cToken: null,
    cAccount: null
  })

  useEffect(() => {
    if (!parentAccount) {
      return
    }
    fetchCompoundData(account, parentAccount).then(result => setState(result))

    const interval = setInterval(async () => {
      fetchCompoundData(account, parentAccount).then(result => setState(result))
    }, 15000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  return state
}

export const useProgressivePrice = (supplyRate, balance) => {
  const [state, setState] = useState({
    balance
  })
  const value = balance.toString()

  useEffect(() => {
    const previous = Date.now()
    const supplyRatePerMilliSecond = supplyRate / 365 / 24 / 60 / 60 / 1000
    const interval = setInterval(() => {
      const now = Date.now()
      const delta = now - previous
      const multiplier = 1 + supplyRatePerMilliSecond * delta
      setState(state => ({
        ...state,
        balance: balance.times(multiplier)
      }))
    }, 1000)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [supplyRate, value])

  return state.balance
}