// @flow

import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import type { T } from 'types/common'
import Text from 'components/base/Text'

class SummaryDesc extends PureComponent<{
  t: T,
  totalAccounts: number,
}> {
  render() {
    const { totalAccounts, t } = this.props
    return (
      <Text
        color="text.secondary"
        fontSize={5}
        ff="Museo Sans|Light"
        data-e2e="dashboard_accountsSummaryDesc"
      >
        {t('dashboard.summary', { count: totalAccounts })}
      </Text>
    )
  }
}

export default translate()(SummaryDesc)
