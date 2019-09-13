// @flow

import styled from 'styled-components'
import React from 'react'
import Text from 'components/base/Text'
import { darken } from 'styles/helpers'

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 10px;
  padding: 0px 4px;
  min-height: 20px;
  align-self: center;
  border-radius: 4px;
  color: ${p => p.color || p.theme.colors.palette.background.paper};
  background-color: ${p => p.backgroundColor || p.theme.colors.wallet};
  text-decoration: none;
  text-transform: uppercase;

  ${p =>
    p.onClick
      ? `&:hover {
          background-color: ${darken(p.backgroundColor || p.theme.colors.wallet, 0.05)};
        }`
      : ''}
`

const Tag = ({
  color,
  backgroundColor,
  children,
  onClick,
}: {
  color?: string,
  backgroundColor?: string,
  children?: React$Node,
  onClick?: Function,
}) => (
  <TagWrapper onClick={onClick} color={color} backgroundColor={backgroundColor}>
    <Text ff="Open Sans|Bold" align="center" fontSize={11}>
      {children}
    </Text>
  </TagWrapper>
)

export default Tag
