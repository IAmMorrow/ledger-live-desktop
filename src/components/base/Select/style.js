import { colors } from 'styles/theme'
import { ff } from 'styles/helpers'

export default {
  control: (styles, { isFocused }) => ({
    ...styles,
    ...ff('Open Sans|SemiBold'),
    height: 40,
    backgroundColor: 'palette.background.paper',
    cursor: 'pointer',
    ...(isFocused
      ? {
          borderColor: colors.wallet,
          boxShadow: 'rgba(0, 0, 0, 0.05) 0 2px 2px',
        }
      : {}),
  }),
  valueContainer: styles => ({
    ...styles,
    paddingLeft: 15,
    color: colors.palette.text.shade80,
  }),
  indicatorSeparator: styles => ({
    ...styles,
    background: 'none',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    ...ff('Open Sans|Regular'),
    color: colors.palette.text.shade100,
    padding: '10px 15px 10px 15px',
    ...(isFocused
      ? {
          background: colors.palette.background.default,
          color: colors.palette.text.shade100,
        }
      : {}),
    ...(isSelected
      ? {
          background: 'unset !important',
          ...ff('Open Sans|SemiBold'),
        }
      : {
          cursor: 'pointer',
        }),
  }),
  menu: styles => ({
    ...styles,
    border: `1px solid ${colors.palette.divider}`,
    boxShadow: 'rgba(0, 0, 0, 0.05) 0 2px 2px',
  }),
  menuList: styles => ({
    ...styles,
    background: 'palette.background.paper',
    borderRadius: 3,
    overflow: 'hidden',
  }),
  container: styles => ({
    ...styles,
    fontSize: 13,
  }),
}
