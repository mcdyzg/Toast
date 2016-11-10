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
