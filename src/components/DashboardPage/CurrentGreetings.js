// @flow
import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import type { T } from 'types/common'

import Text from 'components/base/Text'

const getCurrentGreetings = () => {
  const localTimeHour = new Date().getHours()
  const afternoon_breakpoint = 12
  const evening_breakpoint = 17
  if (localTimeHour >= afternoon_breakpoint && localTimeHour < evening_breakpoint) {
    return 'dashboard.greeting.afternoon'
  } else if (localTimeHour >= evening_breakpoint) {
    return 'dashboard.greeting.evening'
  }
  return 'dashboard.greeting.morning'
}

class CurrentGettings extends PureComponent<{ t: T }> {
  render() {
    const { t } = this.props
    return (
      <Text color="text.primary" ff="Museo Sans" fontSize={7} data-e2e="dashboard_currentGettings">
        {t(getCurrentGreetings())}
      </Text>
    )
  }
}

export default translate()(CurrentGettings)
