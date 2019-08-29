// @flow

import React from 'react'
import styled from 'styled-components'

import Text from 'components/base/Text'
import Box from './Box'

const RawCard = styled(Box).attrs({
  bg: 'background.primary',
  p: 3,
  boxShadow: 0,
  borderRadius: 1,
})``

export default ({ title, ...props }: { title?: any }) => {
  if (title) {
    return (
      <Box flow={4} grow>
        <Text color="text.primary" ff="Museo Sans" fontSize={6}>
          {title}
        </Text>
        <RawCard grow {...props} />
      </Box>
    )
  }
  return <RawCard {...props} />
}
