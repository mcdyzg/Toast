var transitionEvents = require('react-kit/transitionEvents');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var timer;
var anim = {
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
            // transform: 'translate3d(-50%, -300px, 0)'
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
var showAnimation = anim.show;
var hideAnimation = anim.hide;
var showToastAnimation = anim.showToastAnimation;
var hideToastAnimation = anim.hideToastAnimation;

var animation = {

    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },
    hide : {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    getRef: function(willHidden) {
        return 'toast';
    },

    getToastStyle: function(willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            maxWidth:'100%',
            textAlign:'center',
            padding:'10px',
            borderRadius:'3px',
            transform: "translate3d(-50%, 0, 0)",
            bottom: "20%",
            left: "50%",
            color:'#FFF',
            backgroundColor: "#333",
            zIndex: 1050,
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideToastAnimation : showToastAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        })
    }
}


var Toast = React.createClass({
        propTypes: {
            className: React.PropTypes.string,
            // 设置esc键是否可以关闭dialog.
            keyboard: React.PropTypes.bool,
            // 回调函数，show时候回调
            onShow: React.PropTypes.func,
            // 回调函数，hide时候回调
            onHide: React.PropTypes.func,
            //
            animation: React.PropTypes.object,
            // 几秒后提示消失，默认3000,即3秒
            duration: React.PropTypes.number,
            // 提示的信息
            message: React.PropTypes.string
        },

        /**
         * @doc overview
         * @name getDefaultProps
         *
         * @returns {Object} -props object
         *  - `className` – `{string}` - calssName设置
         *  - `onShow` – `{function}` - show的时候的回调函数
         *  - `onHide` – `{function}` - hide的时候的回调函数
         *  - `animation` – `{object}` - 具体的动画效果对象
         *  - `duration` – `{number}` - 几秒后提示消失，默认3秒
         *  - `message` – `{string}` - 要提示的信息
         *  - `keyboard` – `{boolean}` - 是否需要esc键隐藏toast
         * @description
         * 设置default props
         *
         */
        getDefaultProps: function() {
            return {
                className: "",
                onShow: function(){},
                onHide: function(){},
                animation: animation,
                keyboard: true,
                duration: 3000,
                message: ''
            };
        },
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
        getInitialState: function(){
            return {
                willHidden: false,
                hidden: true
            }
        },

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
        hasHidden: function(){
            return this.state.hidden;
        },

        /**
         * @doc overview
         * @name componentDidMount
         *
         * @description
         * render之后执行，目的是在transition事件中添加监听
         *
         */
        componentDidMount: function(){
            var ref = this.props.animation.getRef();
            var node = this.refs[ref].getDOMNode();
            var endListener = function(e) {
                if (e && e.target !== node) {
                    return;
                }
                transitionEvents.removeEndEventListener(node, endListener);
                this.enter();
            }.bind(this);
            transitionEvents.addEndEventListener(node, endListener);
        },

        render: function() {
            // 判断是否是隐藏的toast，如果是就不需要进行render了。
            var hidden = this.hasHidden();
            if(hidden) return null;
            // 固话参数
            var willHidden = this.state.willHidden;
            var animation = this.props.animation;
            var toastStyle = animation.getToastStyle(willHidden);
            var ref = animation.getRef(willHidden);
            //
            if(willHidden) {
                var node = this.refs[ref].getDOMNode();
                var endListener = function(e) {
                    if (e && e.target !== node) {
                        return;
                    }
                    transitionEvents.removeEndEventListener(node, endListener);
                    this.leave();
                }.bind(this);
                transitionEvents.addEndEventListener(node, endListener);
            }

            return (<span>
                <div ref="toast" style={toastStyle} className={this.props.className}>
                    {this.props.message}
                </div>
             </span>);
        },
        // hide toast 回调
        leave: function(){
            this.setState({
                hidden: true
            });
            this.props.onHide();
        },
        // show toast回调
        enter: function(){
            this.props.onShow();
        },
        // 显示toast
        show: function(){
            var t = this;
            if(timer && (typeof timer === 'number')){
                clearTimeout(timer)
            }
            // if(!this.hasHidden()) return;
            this.props.onShow();
            this.setState({
                willHidden: false,
                hidden: false
            });
            timer = setTimeout(t.hide,this.props.duration)
        }, 
        // 隐藏toast
        hide: function(){
            if(this.hasHidden()) return;

            this.setState({
                willHidden: true
            });
        },
        // hide show toggle
        toggle: function(){
            if(this.hasHidden())
                this.show();
            else
                this.hide();
        },
        // 监听esc按键，隐藏toast
        listenKeyboard: function(event) {
            if (this.props.keyboard &&
                (event.key === "Escape" ||
                event.keyCode === 27)) {
                this.hide();
            }
        },

        componentDidMount: function() {
            window.addEventListener("keydown", this.listenKeyboard, true);
        },

        componentWillUnmount: function() {
            window.removeEventListener("keydown", this.listenKeyboard, true);
        }

    });

module.exports = Toast;
