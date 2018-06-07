import React, { Fragment } from 'react'
import { Spring, animated } from 'react-spring'
//
import ChevronDown from './ChevronDown'
import type { tSubItem } from './'

export default function SubItem({ items }): { items: tSubItem } {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
      {styles => (
        <animated.div style={styles} className="subitem">
          SubItem
        </animated.div>
      )}
    </Spring>
  )
}
