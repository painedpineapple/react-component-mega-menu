// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Spring, animated, Trail } from 'react-spring'
//
import Container from './index.style'
import Item from './Item'

const AnimatedContainer = animated(Container)

export type tSubItem = {
  id: string | number,
  title: string,
  url?: string,
  items?: Array<{
    id: string | number,
    title: string,
    url: string,
  }>,
}

export type tItem = {
  id: string | number,
  title: string,
  url?: string,
  items?: Array<tSubItem>,
}

type tProps = {
  options: {
    items: Array<tItem>,
    arrowWithButton?: boolean,
    xSpacing?: number,
    ySpacing?: number,
    styles?: {},
  },
}

export default class MegaMenu extends React.Component<
  tProps,
  {
    subMenuStatuses: any,
  },
> {
  containerRef: any
  xSpacing = 15
  ySpacing = 15
  constructor(props: tProps) {
    super(props)

    this.containerRef = React.createRef()

    this.xSpacing = props.options.xSpacing || this.xSpacing
    this.ySpacing = props.options.ySpacing || this.ySpacing

    this.state = {
      subMenuStatuses: {
        ...props.options.items.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: false }),
          {},
        ),
      },
    }
  }
  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.outsideClickListener)
    }
  }
  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.outsideClickListener)
    }
  }
  outsideClickListener = (event: any) => {
    if (
      // $FlowFixMe
      !ReactDOM.findDOMNode(this.containerRef.current).contains(event.target)
    ) {
      this.toggleSubMenu('')
    }
  }
  toggleSubMenu = (itemId: string) => {
    this.setState(prevState => {
      const subMenuStatuses = {}

      for (let key in prevState.subMenuStatuses) {
        if (key !== itemId) {
          subMenuStatuses[key] = false
        } else {
          subMenuStatuses[key] = !prevState.subMenuStatuses[key]
        }
      }

      return {
        ...prevState,
        subMenuStatuses,
      }
    })
  }
  render() {
    let { options: opts, ...props } = this.props
    const { items, arrowWithButton, ...options } = opts
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
        {styles => (
          <AnimatedContainer
            ref={this.containerRef}
            style={styles}
            options={{
              ...options,
              xSpacing: this.xSpacing,
              ySpacing: this.ySpacing,
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
                  <Item
                    arrowWithButton={arrowWithButton || false}
                    item={item}
                    key={item.id}
                    toggleSubMenu={this.toggleSubMenu}
                    subMenuActive={this.state.subMenuStatuses[item.id]}
                  />
                </span>
              ))}
            </Trail>
          </AnimatedContainer>
        )}
      </Spring>
    )
  }
}
