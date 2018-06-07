import React, { Fragment } from 'react'
//
import ChevronDown from './ChevronDown'
import SubItem from './SubItem'
import type { tItem } from './'

export default function Item({
  item,
  subMenuActive,
  toggleSubMenu,
}: {
  ...tItem,
  toggleSubMenu: (itemId: string) => void,
  subMenuActive: boolean,
}) {
  if (item.url && item.items.length) {
    return (
      <Fragment>
        <a href={item.url}>{item.title}</a>
        <button onClick={() => toggleSubMenu(item.id)}>
          <ChevronDown />
        </button>
        {subMenuActive && <SubItem />}
      </Fragment>
    )
  } else if (!item.url && item.items.length) {
    return (
      <Fragment>
        <button onClick={() => toggleSubMenu(item.id)}>{item.title}</button>
        {subMenuActive && <SubItem />}
      </Fragment>
    )
  } else {
    return <a href={item.url}>{item.title}</a>
  }
}
