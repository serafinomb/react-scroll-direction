'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var throttle = _interopDefault(require('lodash.throttle'));
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var SCROLL_DIRECTION_UP = 'UP';
var SCROLL_DIRECTION_DOWN = 'DOWN';
var THROTTLE_WAIT = 150;
/**
 *
 * @param {number} scrollY
 * @param {number} offsetThreshold
 * @param {number} lastScrollY
 * @param {SCROLL_DIRECTION_DOWN|SCROLL_DIRECTION_UP|null} currentScrollDirection
 * @returns {*}
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


function withScrollDirection(WrappedComponent, offsetThreshold) {
  if (offsetThreshold === void 0) {
    offsetThreshold = 0;
  }

  var WithScrollDirection =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(WithScrollDirection, _React$Component);

    function WithScrollDirection(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        scrollDirection: getScrollDirection(window.pageYOffset, offsetThreshold, 0, null)
      };
      _this.lastScrollY = 0;
      _this.onWindowScroll = throttle(_this._onWindowScrollCallback.bind(_assertThisInitialized(_assertThisInitialized(_this))), THROTTLE_WAIT);
      return _this;
    }

    var _proto = WithScrollDirection.prototype;

    _proto._onWindowScrollCallback = function _onWindowScrollCallback() {
      var nextScrollDirection = getScrollDirection(window.pageYOffset, offsetThreshold, this.lastScrollY, this.state.scrollDirection);

      if (this.state.scrollDirection !== nextScrollDirection) {
        this.setState({
          scrollDirection: nextScrollDirection
        });
      }

      this.lastScrollY = window.scrollY;
    };

    _proto.componentDidMount = function componentDidMount() {
      window.addEventListener('scroll', this.onWindowScroll, false);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.removeEventListener('scroll', this.onWindowScroll, false);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          wrappedComponentRef = _this$props.wrappedComponentRef,
          props = _objectWithoutPropertiesLoose(_this$props, ["wrappedComponentRef"]);

      return React.createElement(WrappedComponent, _extends({}, props, {
        ref: wrappedComponentRef,
        scrollDirection: this.state.scrollDirection
      }));
    };

    return WithScrollDirection;
  }(React.Component);

  WithScrollDirection.displayName = "WithScrollDirection(" + (WrappedComponent.displayName || WrappedComponent.name) + ")";
  return hoistNonReactStatics(WithScrollDirection, WrappedComponent);
}

exports.SCROLL_DIRECTION_UP = SCROLL_DIRECTION_UP;
exports.SCROLL_DIRECTION_DOWN = SCROLL_DIRECTION_DOWN;
exports.default = withScrollDirection;
