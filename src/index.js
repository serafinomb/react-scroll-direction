import React from 'react';
import throttle from 'lodash.throttle';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const SCROLL_DIRECTION_UP = 'UP';
export const SCROLL_DIRECTION_DOWN = 'DOWN';

const THROTTLE_WAIT = 150;

/**
 *
 * @param {number} scrollY
 * @param {number} offsetThreshold
 * @param {number} lastScrollY
 * @param {SCROLL_DIRECTION_DOWN|SCROLL_DIRECTION_UP|null} currentScrollDirection
 * @returns {SCROLL_DIRECTION_DOWN|SCROLL_DIRECTION_UP|null}
 */
function getScrollDirection(scrollY, offsetThreshold, lastScrollY, currentScrollDirection) {
  if (scrollY <= offsetThreshold) {
    return null;
  } else if (scrollY < lastScrollY) {
    return SCROLL_DIRECTION_UP;
  } else if (scrollY > lastScrollY) {
    return SCROLL_DIRECTION_DOWN;
  } else {
    return currentScrollDirection;
  }
}

/**
 *
 * @param {React.Component} WrappedComponent
 * @param {number} offsetThreshold For how many pixels from the top of the page
 *   we should ignore the scroll direction, usually for sticky headers (the
 *   header's height).
 * @returns {{new(): WithScrollDirection, prototype: WithScrollDirection}}
 */
export default function withScrollDirection(WrappedComponent, offsetThreshold = 0) {
  class WithScrollDirection extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        scrollDirection: getScrollDirection(
          window.pageYOffset, offsetThreshold, 0, null
        ),
      };

      this.lastScrollY = 0;

      this.onWindowScroll = throttle(
        this._onWindowScrollCallback.bind(this),
        THROTTLE_WAIT
      );
    }

    _onWindowScrollCallback() {
      const scrollY = window.pageYOffset;
      
      const nextScrollDirection = getScrollDirection(
        scrollY, offsetThreshold, this.lastScrollY, this.state.scrollDirection
      );

      if (this.state.scrollDirection !== nextScrollDirection) {
        this.setState({ scrollDirection: nextScrollDirection });
      }

      this.lastScrollY = scrollY;
    };

    componentDidMount() {
      window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    render() {
      const { wrappedComponentRef, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          ref={wrappedComponentRef}
          scrollDirection={this.state.scrollDirection} />
      );
    }
  }

  WithScrollDirection.displayName = (
    `WithScrollDirection(${WrappedComponent.displayName || WrappedComponent.name})`
  );

  return hoistNonReactStatics(WithScrollDirection, WrappedComponent);
}
