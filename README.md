Toast
==========

信息提示插件

## 项目通用js引用说明

react项目的通用引用包cdn路径为
//miz-cdn.b0.upaiyun.com/miz-js-lib/miz-react.min.js
封装了 react-0.14.7.js ract-dom.0.14.7.js react-router-2.0.1.min.js
压缩版本，源码可以自己去下载来看

辅助js
//miz-cdn.b0.upaiyun.com/miz-js-lib/miz-js-base.min.js
包含了 zepto.min.js
      fastclick.js
      lodash.js
      q.js
      TapEffect.js
由于lodash可以根据方法分模块加载，在以后的版本中决定把lodash移除，需要使用自行在项目中require即可。

动画js使用的是green-sock
//miz-cdn.b0.upaiyun.com/miz-js-lib/green-sock.min.js
包含了tweenlit drag组件。至于green-sock的api请参考 [green-sock官网](http://greensock.com/)


## 依赖说明

本例依赖 react-kit
需要 cnpm isntall react-kit
你也可以把 react-kit 放到自己项目的package.json的依赖里面

## Demo

checkout code: [](http://)

and run:

```
npm install
gulp watch
```

有些时候国内npm源访问比较慢，那么推荐使用cnpm。建议使用nvm管理自己的node版本，建议使用较高版本的nodejs。

```
npm install cnpm -g
cnpm install -l
gulp watch
```

## Usage

1. 引入Toast
2. 在render方法里<Toast ref='test' />,ref属性必须指定
3. this.refs.test.show()调出Toast，Toast默认3秒自动消失，也可以通过设置参数控制消失时间。

```
	var Toast = require('../src/Toast');
	
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
	
	var APP = React.createClass({
	
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
	            <div>
	                <div>
	                    <button style={btnStyle} onClick={this.showToast}>Open</button>
	                    <Toast ref='J_toast' className="toast" message={this.state.message}/>
	                </div>
	            </div>
	        );
	    }
	});
	ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
```

## API

duration:提示框持续时间，默认3000，即3秒

message:提示框中的提示信息

## CHANGELOG ##

pub/1.2.0:

1. 删除回调函数