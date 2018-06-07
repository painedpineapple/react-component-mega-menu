import React, { Fragment } from 'react'
import { Spring, animated } from 'react-spring'
//
import ChevronDown from './ChevronDown'
import type { tSubItem } from './'

export default function SubItemsList({ items }): { items: Array<tSubItem> } {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
      {styles => (
        <animated.div style={styles} className="subitem">
          <div className="subitem-inner">
            {items.map(item => <SubItem item={item} key={item.id} />)}
          </div>
        </animated.div>
      )}
    </Spring>
  )
}

function SubItem({ item }): { item: tSubItem } {
  const { title, url, items } = item
  if (url && items.length) {
    return (
      <div className="subitem-section link-and-items">
        <a href={url} className="section-title">
          {title}
        </a>
        <ul>
          {items.map(subItem => (
            <a key={subItem.id} href={subItem.url}>
              {subItem.title}
            </a>
          ))}
        </ul>
      </div>
    )
  } else if (!url && items.length) {
    return (
      <div className="subitem-section items-only">
        <span className="section-title">{title}</span>
        <ul>
          {items.map(subItem => (
            <a key={subItem.id} href={subItem.url}>
              {subItem.title}
            </a>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div className="subitem-section link-only">
        <a href={url} className="section-title">
          {title}
        </a>
      </div>
    )
  }
}
