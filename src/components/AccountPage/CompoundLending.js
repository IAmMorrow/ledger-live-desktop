// @flow

import React from 'react'
import styled from 'styled-components'
import type { Account, TokenAccount } from '@ledgerhq/live-common/lib/types/account'
import Text from 'components/base/Text'
import Box, { Card } from 'components/base/Box'
import type { T } from 'types/common'
import BigNumber from 'bignumber.js'
import FormattedVal from '../base/FormattedVal'
import { useProgressivePrice } from './compound'
import ActualPrice from '../ActualPrice'

type Props = {
  account: Account,
  lendingAccount: TokenAccount,
  compoundData: any,
  t: T,
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const TopContainer = styled(Box)`
  border-bottom: solid 1px ${p => p.theme.colors.palette.divider}
`

const PercentValue = styled(FormattedVal)`
  border: solid 1px ${p => p.theme.colors.palette.text.shade20};
  text-align: center;
  border-radius: 8px;
  display: inline-flex;
  padding: 6px 0px;
  justify-content: center;
`

const DataTitle = styled(Text).attrs(() => ({
  ff: 'Inter|Medium',
  fontSize: 12,
  color: "palette.text.shade60"
}))`
  margin-bottom: 8px;
`

const calculateLentBalance = (lendingAccount: TokenAccount, actualRate) => lendingAccount.balance.times(10 ** (18 - 8)).times(actualRate)

const calculateVirtualBalance = (account: TokenAccount, lendingAccount: TokenAccount, actualRate) => account.balance.plus(calculateLentBalance(lendingAccount, actualRate))

const CompoundLending = ({account, lendingAccount, compoundData, t }: Props) => {
  const { cAccount, cToken } = compoundData

  const exchangeRate = cToken ? cToken.exchange_rate.value : 0
  const supplyRate = cToken ? cToken.supply_rate.value : 0

  const balance = useProgressivePrice(supplyRate, calculateLentBalance(lendingAccount, exchangeRate))

  return (
    <Box mb={50}>
      <Wrapper>
        <Text color="palette.text.shade100" mb={2} ff="Inter|Medium" fontSize={6}>
          {'Lending'}
        </Text>
      </Wrapper>
      <Card px={24}>
        <TopContainer horizontal py={16}>
          <Box vertical style={{ minWidth: 420 }}>
            <DataTitle>{'Total balance'}</DataTitle>
            <FormattedVal
              animateTicker
              color="palette.text.shade100"
              unit={account.token.units[0]}
              fontSize={7}
              showCode
              disableRounding
              val={account.balance.plus(balance).precision(12)}
              style={{
                marginBottom: 2
              }}
            />
            <ActualPrice
              unit={account.token.units[0]}
              value={account.balance.plus(balance)}
              from={account.token}
              color="palette.text.shade60"
              fontSize={12}
            />
          </Box>
          <Box vertical>
            <DataTitle>{'Rewards'}</DataTitle>
            <FormattedVal
              animateTicker
              alwaysShowSign
              color="positiveGreen"
              unit={account.token.units[0]}
              fontSize={7}
              showCode
              val={BigNumber((cAccount ? cAccount.lifetime_supply_interest_accrued.value : 0) * exchangeRate).times(10 ** 18)}
              style={{
                marginBottom: 2
              }}
            />
            <ActualPrice
              alwaysShowSign
              unit={account.token.units[0]}
              value={BigNumber((cAccount ? cAccount.lifetime_supply_interest_accrued.value : 0) * exchangeRate).times(10 ** 18)}
              from={account.token}
              color="palette.text.shade60"
              fontSize={12}
            />
          </Box>
        </TopContainer>
        <Box horizontal py={16}>
          <Box vertical style={{ minWidth: 420 }}>
            <DataTitle>{'Lent amount'}</DataTitle>
            <FormattedVal
              animateTicker
              color="palette.text.shade100"
              unit={account.token.units[0]}
              fontSize={7}
              disableRounding
              showCode
              val={calculateLentBalance(lendingAccount, exchangeRate)}
              style={{
                marginBottom: 2
              }}
            />
            <ActualPrice
              unit={account.token.units[0]}
              value={calculateLentBalance(lendingAccount, exchangeRate)}
              from={account.token}
              color="palette.text.shade60"
              fontSize={12}
            />
          </Box>
          <Box vertical>
            <DataTitle>{'Actual yearly interests'}</DataTitle>
            <PercentValue
              animateTicker
              alwaysShowSign
              isPercent
              color="palette.text.shade100"
              fontSize={7}
              showCode
              val={BigNumber(cToken ? cToken.supply_rate.value : 0).times(100).precision(3)}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default CompoundLending
