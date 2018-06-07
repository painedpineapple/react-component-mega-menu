import React, { Fragment } from 'react'
//
import ChevronDown from './ChevronDown'
import SubItem from './SubItem'
import type { tItem } from './'

export default function Item({
  item,
  subMenuActive,
  toggleSubMenu,
  arrows,
}: {
  ...tItem,
  toggleSubMenu: (itemId: string) => void,
  subMenuActive: boolean,
  arrows: 'always' | 'never' | 'only-no-link',
}) {
  if (item.url && item.items.length) {
    return (
      <Fragment>
        <a href={item.url} className="item-has-children">
          {item.title}
        </a>
        <button onClick={() => toggleSubMenu(item.id)}>
          <ChevronDown />
        </button>
        {subMenuActive && <SubItem items={item.items} />}
      </Fragment>
    )
  } else if (!item.url && item.items.length) {
    return (
      <Fragment>
        <button
          className={`item-has-children ${(arrows === 'always' ||
            arrows === 'only-without-link') &&
            'button-has-icon'}`}
          onClick={() => toggleSubMenu(item.id)}
        >
          {item.title}
          {(arrows === 'always' || arrows === 'only-without-link') && (
            <ChevronDown />
          )}
        </button>
        {subMenuActive && <SubItem items={item.items} />}
      </Fragment>
    )
  } else {
    return <a href={item.url}>{item.title}</a>
  }
}
