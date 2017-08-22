'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixins = require('../utils/mixins');

var _colors = require('../utils/colors');

var _graphics = require('../utils/graphics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_Component) {
  _inherits(Circle, _Component);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Circle.prototype.render = function render() {
    var _props = this.props,
        background = _props.background,
        cap = _props.cap,
        size = _props.size,
        theme = _props.theme,
        thickness = _props.thickness,
        values = _props.values;

    var width = size === 'full' ? 288 : (0, _mixins.parseMetricToInt)(theme.global.size[size]);
    var height = (0, _mixins.parseMetricToInt)(theme.global.edgeSize[thickness]);
    var mid = width / 2;
    var radius = width / 2 - height / 2;
    var max = 100;
    var anglePer = 360 / max;

    var startValue = 0;
    var startAngle = 0;
    var paths = (values || []).map(function (valueArg, index) {
      var value = valueArg.value,
          label = valueArg.label,
          color = valueArg.color,
          rest = _objectWithoutProperties(valueArg, ['value', 'label', 'color']);

      var key = 'p-' + index;
      var colorName = color || 'neutral-' + (index + 1);

      var endAngle = void 0;
      if (startValue + value >= max) {
        endAngle = 360;
      } else {
        endAngle = Math.min(360, (0, _graphics.translateEndAngle)(startAngle, anglePer, value));
      }

      var d = (0, _graphics.arcCommands)(width / 2, width / 2, radius, startAngle, endAngle);
      startValue += value;
      startAngle = endAngle;

      return _react2.default.createElement('path', _extends({
        key: key,
        d: d,
        fill: 'none',
        stroke: (0, _colors.colorForName)(colorName, theme),
        strokeWidth: height,
        strokeLinecap: cap
      }, rest));
    }).reverse(); // reverse so the caps looks right

    return _react2.default.createElement(
      'svg',
      {
        viewBox: '0 0 ' + width + ' ' + width,
        width: size === 'full' ? '100%' : width,
        height: size === 'full' ? '100%' : width
      },
      _react2.default.createElement('circle', {
        cx: mid,
        cy: mid,
        r: radius,
        stroke: (0, _colors.colorForName)(background, theme),
        strokeWidth: height,
        strokeLinecap: cap,
        fill: 'none'
      }),
      paths
    );
  };

  return Circle;
}(_react.Component);

Circle.defaultProps = {
  background: 'light-1',
  cap: 'square'
};
exports.default = Circle;