import React, { Fragment } from 'react'
//
import ChevronDown from './ChevronDown'
import type { tItem } from './'

export default class Item extends React.Component<tItem, {}> {
  render() {
    const { item } = this.props
    if (item.url && item.items.length) {
      return (
        <Fragment>
          <a href={item.url}>{item.title}</a>
          <button>
            <ChevronDown />
          </button>
        </Fragment>
      )
    } else if (!item.url && item.items.length) {
      return (
        <Fragment>
          <button>{item.title}</button>
        </Fragment>
      )
    } else {
      return <a href={item.url}>{item.title}</a>
    }
  }
}
