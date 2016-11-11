/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Toast = __webpack_require__(1);

	var btnStyle = {
	    margin: '1em auto',
	    padding: '1em 2em',
	    outline: 'none',
	    fontSize: 16,
	    fontWeight: '600',
	    background: '#C94E50',
	    color: '#FFFFFF',
	    border: 'none'
	};      

	var containerStyle = {
	    padding: '2em',
	    textAlign: 'center'
	};
	       
	var APP = React.createClass({displayName: "APP",

	    getInitialState:function(){
	        return {
	            message:'init'
	        }
	    },

	    showToast:function(){
	        this.setState({
	            message:'hahaha'
	        })
	        this.refs.J_toast.show();
	    },
	    

	    render: function() { 
	        var t = this;   
	        return (       
	            React.createElement("div", null, 
	                React.createElement("div", null, 
	                    React.createElement("button", {style: btnStyle, onClick: this.showToast}, "Open"), 
	                    React.createElement(Toast, {ref: "J_toast", duration: 3000, className: "toast", message: this.state.message})
	                )
	            )
	        );
	    }
	});
	ReactDOM.render(React.createElement(APP, null), document.getElementById('AppContainer'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var transitionEvents = __webpack_require__(2);
	var insertKeyframesRule = __webpack_require__(3);
	var appendVendorPrefix = __webpack_require__(4);
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
	            bottom: "15%",
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


	var Toast = React.createClass({displayName: "Toast",
	        propTypes: {
	            className: React.PropTypes.string,
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
	         *  - `animation` – `{object}` - 具体的动画效果对象
	         *  - `duration` – `{number}` - 几秒后提示消失，默认3秒
	         *  - `message` – `{string}` - 要提示的信息
	         * @description
	         * 设置default props
	         *
	         */
	        getDefaultProps: function() {
	            return {
	                className: "",
	                animation: animation,
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

	            return (React.createElement("span", null, 
	                React.createElement("div", {ref: "toast", style: toastStyle, className: this.props.className}, 
	                    this.props.message
	                )
	             ));
	        },
	        // hide toast 回调
	        leave: function(){
	            this.setState({
	                hidden: true
	            });
	        },
	        // 显示toast
	        show: function(){
	            var t = this;
	            if(timer && (typeof timer === 'number')){
	                clearTimeout(timer)
	            }
	            // if(!this.hasHidden()) return;
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

	        componentDidMount: function() {
	            // window.addEventListener("keydown", this.listenKeyboard, true);
	        }

	    });

	module.exports = Toast;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (typeof window !== 'undefined') {
	  detectEvents();
	}


	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	module.exports = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var insertRule = __webpack_require__(5);
	var vendorPrefix = __webpack_require__(6)();
	var index = 0;

	module.exports = function(keyframes) {
	  // random name
	  var name = 'anim_' + (++index) + (+new Date);
	  var css = "@" + vendorPrefix + "keyframes " + name + " {";

	  for (var key in keyframes) {
	    css += key + " {";

	    for (var property in keyframes[key]) {
	      var part = ":" + keyframes[key][property] + ";";
	      // We do vendor prefix for every property
	      css += vendorPrefix + property + part;
	      css += property + part;
	    }

	    css += "}";
	  }

	  css += "}";

	  insertRule(css);

	  return name
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getVendorPropertyName = __webpack_require__(7);

	module.exports = function(target, sources) {
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  var prefixed = {};
	  for (var key in to) {
	    prefixed[getVendorPropertyName(key)] = to[key]
	  }

	  return prefixed
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extraSheet;

	module.exports = function(css) {

	  if (!extraSheet) {
	    // First time, create an extra stylesheet for adding rules
	    extraSheet = document.createElement('style');
	    document.getElementsByTagName('head')[0].appendChild(extraSheet);
	    // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
	    extraSheet = extraSheet.sheet || extraSheet.styleSheet;
	  }

	  var index = (extraSheet.cssRules || extraSheet.rules).length;
	  extraSheet.insertRule(css, index);

	  return extraSheet;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cssVendorPrefix;

	module.exports = function() {

	  if (cssVendorPrefix) return cssVendorPrefix;

	  var styles = window.getComputedStyle(document.documentElement, '');
	  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

	  return cssVendorPrefix = '-' + pre + '-';
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var builtinStyle = __webpack_require__(8);
	var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	var domVendorPrefix;

	// 2009 spec only
	var flexbox = {
	  flex: ['WebkitFlex', 'WebkitBoxFlex'],
	  order: ['WebkitOrder','WebkitBoxOrdinalGroup'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/flex-direction.coffee
	  flexDirection: ['WebkitFlexDirection', 'WebkitBoxOrient', 'WebkitBoxDirection'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/align-items.coffee
	  alignItems: ['WebkitAlignItems', 'WebkitBoxAlign'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/justify-content.coffee
	  justifyContent: ['WebkitJustifyContent', 'WebkitBoxPack'],
	  flexWrap: ['WebkitFlexWrap'],
	  alignSelf: ['WebkitAlignSelf'],
	}

	// Helper function to get the proper vendor property name. (transition => WebkitTransition)
	module.exports = function(prop, isSupportTest) {

	  var vendorProp;
	  if (prop in builtinStyle) return prop;

	  if(flexbox[prop]){
	    // TODO: cache the result
	    var flexProperties = flexbox[prop];
	    for (var i = 0; i < flexProperties.length; ++i) {
	      if (flexProperties[i] in builtinStyle) {
	        return flexProperties[i];
	      }
	    }

	  }else{

	    var UpperProp = prop.charAt(0).toUpperCase() + prop.substr(1);

	    if (domVendorPrefix) {

	      vendorProp = domVendorPrefix + UpperProp;
	      if (vendorProp in builtinStyle) {
	        return vendorProp;
	      }
	    } else {

	      for (var i = 0; i < prefixes.length; ++i) {
	        vendorProp = prefixes[i] + UpperProp;
	        if (vendorProp in builtinStyle) {
	          domVendorPrefix = prefixes[i];
	          return vendorProp;
	        }
	      }
	    }
	  }

	  // if support test, not fallback to origin prop name
	  if (!isSupportTest) {
	    return prop;
	  }

	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = document.createElement('div').style;


/***/ }
/******/ ])