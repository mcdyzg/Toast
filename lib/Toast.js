'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _transitionEvents = require('react-kit/transitionEvents');

var _transitionEvents2 = _interopRequireDefault(_transitionEvents);

var _insertKeyframesRule = require('react-kit/insertKeyframesRule');

var _insertKeyframesRule2 = _interopRequireDefault(_insertKeyframesRule);

var _appendVendorPrefix = require('react-kit/appendVendorPrefix');

var _appendVendorPrefix2 = _interopRequireDefault(_appendVendorPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timer = void 0;
var anim = {
    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    hide: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    showToastAnimation: (0, _insertKeyframesRule2.default)({
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(-50%, -20px, 0)'
        }
    }),

    hideToastAnimation: (0, _insertKeyframesRule2.default)({
        '0%': {
            opacity: 1,
            transform: 'translate3d(-50%, -20px, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(-50%, 0, 0)'
        }
    })
};
var showAnimation = anim.show;
var hideAnimation = anim.hide;
var showToastAnimation = anim.showToastAnimation;
var hideToastAnimation = anim.hideToastAnimation;

var animation = {
    getRef: function getRef() {
        return 'toast';
    },
    getToastStyle: function getToastStyle(willHidden) {
        return (0, _appendVendorPrefix2.default)({
            position: "fixed",
            maxWidth: '100%',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '3px',
            transform: "translate3d(-50%, 0, 0)",
            bottom: "15%",
            left: "50%",
            color: '#FFF',
            backgroundColor: "#333",
            zIndex: 1050,
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideToastAnimation : showToastAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        });
    }
};

var Toast = function (_React$Component) {
    _inherits(Toast, _React$Component);

    /**
     * @doc overview
     * @name getInitialState
     *
     * @returns {Object} -state object
     *  - `willHidden` – `{boolean}` - 要不要隐藏
     *  - `hidden` – `{boolean}` - 是否隐藏
     *
     * @description
     * 返回state数据对象
     *
     */
    function Toast(props) {
        _classCallCheck(this, Toast);

        var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

        _this.state = {
            willHidden: false,
            hidden: true
        };
        return _this;
    }

    /**
     * @doc overview
     * @name getDefaultProps
     *
     * @returns {Object} -props object
     *  - `className` – `{string}` - calssName设置
     *  - `animation` – `{object}` - 具体的动画效果对象
     *  - `duration` – `{number}` - 几秒后提示消失，默认3秒
     *  - `message` – `{string}` - 要提示的信息
     * @description
     * 设置default props
     *
     */


    _createClass(Toast, [{
        key: 'hasHidden',


        /**
         * @doc overview
         * @name hasHidden
         *
         * @returns -state object
         *  - `hidden` – `{boolean}` - 是否隐藏
         *
         * @description
         * 返回toast是否隐藏，通过这个字段来阻断dom的渲染
         *
         */
        value: function hasHidden() {
            return this.state.hidden;
        }
    }, {
        key: 'render',
        value: function render() {
            // 判断是否是隐藏的toast，如果是就不需要进行render了。
            var hidden = this.hasHidden();
            if (hidden) return null;
            // 固话参数
            var willHidden = this.state.willHidden;
            var animation = this.props.animation;
            var toastStyle = animation.getToastStyle(willHidden);
            var ref = animation.getRef(willHidden);
            //
            if (willHidden) {
                var node = this.refs[ref];
                var endListener = function (e) {
                    if (e && e.target !== node) {
                        return;
                    }
                    _transitionEvents2.default.removeEndEventListener(node, endListener);
                    this.leave();
                }.bind(this);
                _transitionEvents2.default.addEndEventListener(node, endListener);
            }

            return _react2.default.createElement(
                'div',
                { ref: 'toast', style: toastStyle, className: this.props.className },
                this.props.message
            );
        }

        // hide toast 回调

    }, {
        key: 'leave',
        value: function leave() {
            this.setState({
                hidden: true
            });
        }

        // 显示toast

    }, {
        key: 'show',
        value: function show() {
            if (timer && typeof timer === 'number') {
                clearTimeout(timer);
            }
            // if(!this.hasHidden()) return;
            this.setState({
                willHidden: false,
                hidden: false
            });
            timer = setTimeout(this.hide.bind(this), this.props.duration);
        }

        // 隐藏toast

    }, {
        key: 'hide',
        value: function hide() {
            if (this.hasHidden()) return;

            this.setState({
                willHidden: true
            });
        }
    }]);

    return Toast;
}(_react2.default.Component);

Toast.defaultProps = {
    className: "",
    animation: animation,
    duration: 3000,
    message: ''
};
Toast.propTypes = {
    className: _react2.default.PropTypes.string,
    //动画
    animation: _react2.default.PropTypes.object,
    // 几秒后提示消失，默认3000,即3秒
    duration: _react2.default.PropTypes.number,
    // 提示的信息
    message: _react2.default.PropTypes.string
};
exports.default = Toast;