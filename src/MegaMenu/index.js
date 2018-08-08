import React from "react";
import ReactDOM from "react-dom";
import { Spring, animated, Trail } from "react-spring";
import PropTypes from "prop-types";
//
import { Wrapper } from "./index.style";
import { Item } from "./Item";

const AnimatedWrapper = animated(Wrapper);

export const tSubItem = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  )
}).isRequired;

export const tItem = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(tSubItem)
}).isRequired;

export class MegaMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    arrowWithButton: PropTypes.bool,
    xSpacing: PropTypes.number,
    ySpacing: PropTypes.number,
    items: PropTypes.arrayOf(tItem).isRequired
  };
  containerRef: any;
  xSpacing = 15;
  ySpacing = 15;
  state = {
    subMenuStatuses: {}
  };
  constructor(props) {
    super(props);

    this.state = {
      subMenuStatuses: {
        ...this.props.items.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: false }),
          {}
        )
      }
    };

    this.containerRef = React.createRef();

    this.xSpacing = props.xSpacing || this.xSpacing;
    this.ySpacing = props.ySpacing || this.ySpacing;
  }
  componentDidMount() {
    if (typeof document !== "undefined") {
      document.addEventListener("click", this.outsideClickListener);
    }
  }
  componentWillUnmount() {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", this.outsideClickListener);
    }
  }
  outsideClickListener = event => {
    if (
      // $FlowFixMe
      !ReactDOM.findDOMNode(this.containerRef.current).contains(event.target)
    ) {
      this.toggleSubMenu("");
    }
  };
  toggleSubMenu = itemId => {
    this.setState(prevState => {
      const subMenuStatuses = {};

      for (let key in prevState.subMenuStatuses) {
        if (key != itemId) {
          subMenuStatuses[key] = false;
        } else {
          subMenuStatuses[key] = !prevState.subMenuStatuses[key];
        }
      }

      return {
        ...prevState,
        subMenuStatuses
      };
    });
  };
  render() {
    let { arrowWithButton, style, className, items, ...props } = this.props;
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} native>
        {styles => (
          <AnimatedWrapper
            ref={this.containerRef}
            style={style}
            className={className}
            options={{
              xSpacing: this.xSpacing,
              ySpacing: this.ySpacing
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
          </AnimatedWrapper>
        )}
      </Spring>
    );
  }
}
