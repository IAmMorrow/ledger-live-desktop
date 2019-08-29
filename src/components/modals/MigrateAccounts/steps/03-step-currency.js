// @flow

import invariant from 'invariant'
import React, { PureComponent, Fragment } from 'react'
import logger from 'logger'
import { reduce } from 'rxjs/operators'
import { Trans } from 'react-i18next'

import type { Account } from '@ledgerhq/live-common/lib/types/account'
import { migrateAccounts } from '@ledgerhq/live-common/lib/account'
import last from 'lodash/last'
import Text from 'components/base/Text'
import TrackPage from 'analytics/TrackPage'

import Button from 'components/base/Button'
import Box from 'components/base/Box'
import { CurrencyCircleIcon } from 'components/base/CurrencyBadge'
import { getCurrencyBridge } from 'bridge'
import styled from 'styled-components'
import IconExclamationCircleThin from 'icons/ExclamationCircleThin'
import TranslatedError from 'components/TranslatedError'
import DebugAppInfosForCurrency from 'components/DebugAppInfosForCurrency'
import type { StepProps } from '../index'
import ExternalLinkButton from '../../../base/ExternalLinkButton'
import RetryButton from '../../../base/RetryButton'
import { urls } from '../../../../config/urls'

type Props = StepProps & { replaceAccounts: (Account[]) => void }

const MigrationError = ({ error }: { error: Error }) => (
  <Box style={{ height: 200 }} px={5} justify="center">
    <Box color="alertRed" align="center">
      <IconExclamationCircleThin size={43} />
    </Box>
    <DebugAppInfosForCurrency />
    <Title>
      <TranslatedError error={error} field="title" />
    </Title>
    <Desc>
      <TranslatedError error={error} field="description" />
    </Desc>
  </Box>
)
const Title = styled(Box).attrs({
  ff: 'Museo Sans',
  fontSize: 5,
  mt: 2,
  color: 'black',
})`
  text-align: center;
`

const Desc = styled(Box).attrs({
  ff: 'Open Sans',
  fontSize: 4,
  mt: 2,
  color: 'graphite',
})`
  text-align: center;
`

class StepCurrency extends PureComponent<Props> {
  componentDidMount() {
    this.props.setScanStatus('scanning')
    this.startScanAccountsDevice()
  }

  componentWillUnmount() {
    this.unsub()
  }

  scanSubscription = null

  unsub = () => {
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe()
    }
  }

  startScanAccountsDevice() {
    this.unsub()
    const { currency, device, setScanStatus, accounts, replaceAccounts } = this.props

    if (!currency || !device) return

    this.scanSubscription = getCurrencyBridge(currency)
      .scanAccountsOnDevice(currency, device.path)
      .pipe(reduce<Account>((all, acc) => all.concat(acc), []))
      .subscribe({
        next: scannedAccounts => {
          replaceAccounts(migrateAccounts({ scannedAccounts, existingAccounts: accounts }))
          setScanStatus('finished')
        },
        error: err => {
          logger.critical(err)
          setScanStatus('error', err)
        },
      })
  }

  render() {
    const { currency, scanStatus, err } = this.props
    invariant(currency, 'No crypto asset given')

    const currencyName = `${currency.name} (${currency.ticker})`
    const pending = scanStatus !== 'finished'

    if (err) {
      return <MigrationError error={err} />
    }

    return (
      <Fragment>
        <TrackPage category="MigrateAccounts" name="Step3" />
        <Box align="center" pt={pending ? 30 : 0} pb={pending ? 40 : 0}>
          <CurrencyCircleIcon
            showSpinner={pending}
            showCheckmark={!pending}
            borderRadius="10px"
            mb={15}
            size={40}
            currency={currency}
          />
          <Box
            ff="Museo Sans|Regular"
            fontSize={6}
            color="text.primary"
            mb={10}
            textAlign="center"
            style={{ width: 370 }}
          >
            <Trans
              i18nKey={
                pending ? 'migrateAccounts.progress.title' : 'migrateAccounts.progress.finished'
              }
              parent="div"
              values={{ currencyName }}
            />
          </Box>
          {pending && (
            <Text color="graphite" ff="Open Sans|Regular" fontSize={4}>
              <Trans i18nKey="migrateAccounts.progress.description" />
            </Text>
          )}
        </Box>
      </Fragment>
    )
  }
}

export const StepCurrencyFooter = ({
  transitionTo,
  scanStatus,
  migratableAccounts,
  moveToNextCurrency,
  getNextCurrency,
  currency,
  totalMigratableAccounts,
}: StepProps) => {
  if (scanStatus === 'error') {
    return (
      <Fragment>
        <ExternalLinkButton mr={2} label={<Trans i18nKey="common.getSupport" />} url={urls.faq} />
        <RetryButton primary onClick={() => transitionTo('device')} />
      </Fragment>
    )
  }
  if (scanStatus !== 'finished' || !currency) return null
  const lastCurrency = last(Object.keys(migratableAccounts))
  const next = lastCurrency !== currency.id && currency.id < lastCurrency ? 'device' : 'overview'
  const nextCurrency = getNextCurrency()
  return (
    <Button
      primary
      onClick={() => {
        if (!totalMigratableAccounts) {
          transitionTo('overview')
        } else {
          moveToNextCurrency(next === 'overview')
          transitionTo(next)
        }
      }}
    >
      <Trans
        i18nKey={next === 'device' ? 'migrateAccounts.cta.nextCurrency' : 'common.continue'}
        values={{ currency: nextCurrency ? nextCurrency.name : '' }}
      />
    </Button>
  )
}

export default StepCurrency
