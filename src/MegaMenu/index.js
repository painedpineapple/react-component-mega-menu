// @flow
import React from 'react'
import { Spring, animated, Trail } from 'react-spring'
//
import Container from './index.style'
import Item from './Item'

const AnimatedContainer = animated(Container)

export type tItem = {
  id: string | number,
  title: string,
  url?: string,
  items?: Array<{
    id: string | number,
    title: string,
    url?: string,
    items?: Array<{
      id: string | number,
      title: string,
      url: string,
    }>,
  }>,
}

export default class MegaMenu extends React.Component<Array<tItem>> {
  render() {
    let { options: opts, ...props } = this.props
    const { items, ...options } = opts
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
        {styles => (
          <AnimatedContainer
            style={styles}
            options={{
              ...options,
              styles: options.styles || {},
            }}
            {...props}
          >
            <Trail
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              keys={items.map(item => item.id)}
            >
              {items.map(item => styles => (
                <span className="lvl1-wrapper" style={styles}>
                  <Item item={item} key={item.id} />
                </span>
              ))}
            </Trail>
          </AnimatedContainer>
        )}
      </Spring>
    )
  }
}
