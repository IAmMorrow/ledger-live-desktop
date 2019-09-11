// @flow

import React, { PureComponent } from 'react'
import type { Account, TokenAccount, PortfolioRange } from '@ledgerhq/live-common/lib/types'
import Box from 'components/base/Box'
import styled from 'styled-components'
import { Grid, WindowScroller } from 'react-virtualized';
import AutoSizer from "react-virtualized-auto-sizer";

import AccountCardPlaceholder from '../AccountGridItem/Placeholder'
import AccountCard from '../AccountGridItem'

type Props = {
  visibleAccounts: (Account | TokenAccount)[],
  hiddenAccounts: (Account | TokenAccount)[],
  onAccountClick: (Account | TokenAccount) => void,
  lookupParentAccount: (id: string) => ?Account,
  range: PortfolioRange,
  showNewAccount: boolean,
  getScrollContainerRef: any,
}

const GridBox = styled(Box)`
  margin-top: 18px;
`

class GridBody extends PureComponent<Props> {
  render() {
    const {
      visibleAccounts,
      hiddenAccounts,
      range,
      showNewAccount,
      onAccountClick,
      lookupParentAccount,
      getScrollContainerRef,
      ...rest
    } = this.props

    const scrollRef = getScrollContainerRef()
    const scrollContainer = scrollRef ? scrollRef.scrollContainer : undefined

    const accounts = [
      ...visibleAccounts,
    ]

    const columnCount = 3
    const rowCount = Math.ceil(accounts.length / columnCount)

    const cellRenderer = ({ columnIndex, rowIndex, style, key }) => {
      const account = accounts[columnCount * rowIndex + columnIndex]
      return (
        <div
          style={{
              ...style,
              paddingTop: 9,
              paddingBottom: 9,
              paddingLeft: columnIndex !== 0 ? 9 : 0,
              paddingRight: columnIndex !== (columnCount - 1) ? 9 : 0
            }}
           key={key}
        >
          <AccountCard
            key={account.id}
            account={account}
            parentAccount={
              account.type === 'TokenAccount' ? lookupParentAccount(account.parentId) : null
            }
            range={range}
            onClick={onAccountClick}
          />
        </div>
      )
    }

    return (
      <GridBox {...rest}>
        <AutoSizer disableHeight>
          {
            ({ width }) => (
              <WindowScroller
                scrollElement={scrollContainer}
              >
                {
                  ({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <Grid
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}

                      cellRenderer={cellRenderer}
                      width={width}
                      columnCount={columnCount}
                      columnWidth={(width / columnCount)}
                      rowHeight={220 + 18}
                      rowCount={rowCount}
                    />

                  )
                }
              </WindowScroller>
            )
          }
        </AutoSizer>
      </GridBox>
    )

    return (
      <GridBox {...rest}>
        {visibleAccounts.map(account => (
          <AccountCard
            key={account.id}
            account={account}
            parentAccount={
              account.type === 'TokenAccount' ? lookupParentAccount(account.parentId) : null
            }
            range={range}
            onClick={onAccountClick}
          />
        ))}
        {showNewAccount ? <AccountCardPlaceholder key="placeholder" /> : null}
        {hiddenAccounts.map(account => (
          <AccountCard
            hidden
            key={account.id}
            account={account}
            parentAccount={
              account.type === 'TokenAccount' ? lookupParentAccount(account.parentId) : null
            }
            range={range}
            onClick={onAccountClick}
          />
        ))}
      </GridBox>
    )
  }
}

export default GridBody
