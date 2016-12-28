'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

import transitionEvents from 'react-kit/transitionEvents'
import insertKeyframesRule from 'react-kit/insertKeyframesRule'
import appendVendorPrefix from 'react-kit/appendVendorPrefix'

let timer;
const anim = {
    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    hide: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    showToastAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(-50%, -20px, 0)'
        }
    }),

    hideToastAnimation: insertKeyframesRule({
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
const showAnimation = anim.show;
const hideAnimation = anim.hide;
const showToastAnimation = anim.showToastAnimation;
const hideToastAnimation = anim.hideToastAnimation;

const animation = {
    getRef() {
        return 'toast';
    },

    getToastStyle(willHidden) {
        return appendVendorPrefix({
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
        })
    }
};


class Toast extends React.Component {
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
    constructor(props) {
        super(props);
        this.state = {
            willHidden: false,
            hidden: true
        }
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
    static defaultProps = {
        className: "",
        animation: animation,
        duration: 3000,
        message: ''
    };
    static propTypes = {
        className: React.PropTypes.string,
        //动画
        animation: React.PropTypes.object,
        // 几秒后提示消失，默认3000,即3秒
        duration: React.PropTypes.number,
        // 提示的信息
        message: React.PropTypes.string
    };

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
    hasHidden() {
        return this.state.hidden;
    }

    render() {
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
                transitionEvents.removeEndEventListener(node, endListener);
                this.leave();
            }.bind(this);
            transitionEvents.addEndEventListener(node, endListener);
        }

        return (
            <div ref="toast" style={toastStyle} className={this.props.className}>
                {this.props.message}
            </div>
        )
    }

    // hide toast 回调
    leave() {
        this.setState({
            hidden: true
        });
    }

    // 显示toast
    show() {
        if (timer && (typeof timer === 'number')) {
            clearTimeout(timer)
        }
        // if(!this.hasHidden()) return;
        this.setState({
            willHidden: false,
            hidden: false
        });
        timer = setTimeout(this.hide.bind(this), this.props.duration)
    }

    // 隐藏toast
    hide() {
        if (this.hasHidden()) return;

        this.setState({
            willHidden: true
        });
    }
}

export default Toast;
