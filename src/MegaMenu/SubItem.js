import React, { Fragment } from 'react'
import { Spring, animated } from 'react-spring'
//
import ChevronDown from './ChevronDown'
import type { tSubItem } from './'

export default class SubItem extends React.Component<tSubItem> {
  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
        {styles => <animated.div style={styles}>SubItem</animated.div>}
      </Spring>
    )
  }
}
