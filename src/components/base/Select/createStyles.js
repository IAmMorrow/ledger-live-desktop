// @flow

import { ff, darken } from 'styles/helpers'

export default ({
  width,
  minWidth,
  small,
  isRight,
  isLeft,
}: {
  width: number,
  minWidth: number,
  small: boolean,
  isRight: boolean,
  isLeft: boolean,
}, theme: any) => ({
  control: (styles: Object, { isFocused }: Object) => ({
    ...styles,
    width,
    minWidth,
    ...ff('Open Sans|SemiBold'),
    height: small ? 34 : 40,
    minHeight: 'unset',
    borderRadius: isRight ? '0 4px 4px 0' : isLeft ? '4px 0 0 4px' : 4,
    borderColor: theme.colors.background.secondary,
    backgroundColor: theme.colors.background.primary,

    ...(isFocused
      ? {
          borderColor: theme.colors.wallet,
          boxShadow: 'rgba(0, 0, 0, 0.05) 0 2px 2px',
        }
      : {}),
  }),
  valueContainer: (styles: Object) => ({
    ...styles,
    paddingLeft: 15,
    color: theme.colors.graphite,
  }),
  indicatorSeparator: (styles: Object) => ({
    ...styles,
    background: 'none',
  }),
  noOptionsMessage: (styles: Object) => ({
    ...styles,
    fontSize: small ? 12 : 13,
  }),
  option: (styles: Object, { isFocused, isSelected }: Object) => ({
    ...styles,
    ...ff('Open Sans|Regular'),
    fontSize: small ? 12 : 13,
    color: theme.colors.text.secondary,
    padding: '10px 15px 10px 15px',
    ':active': {
      ...styles[':active'],
      backgroundColor: darken(theme.colors.background.secondary, 0.1)
    },
    ...(isFocused
      ? {
          background: theme.colors.background.secondary,
          color: theme.colors.text.primary,
        }
      : {}),
    ...(isSelected
      ? {
        background: 'unset !important',
          ...ff('Open Sans|SemiBold'),
        }
      : {}),
  }),
  menu: (styles: Object) => ({
    ...styles,
    border: `1px solid ${theme.colors.background.secondary}`,
    boxShadow: 'rgba(0, 0, 0, 0.05) 0 2px 2px',
    background: theme.colors.background.primary,
  }),
  menuList: (styles: Object) => ({
    ...styles,
    borderRadius: 3,
  }),
  menuPortal: (styles: Object) => ({ ...styles, zIndex: 101 }),
  container: (styles: Object) => ({
    ...styles,
    fontSize: small ? 12 : 13,
  }),
})
