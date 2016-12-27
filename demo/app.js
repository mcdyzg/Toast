import React from 'react'
import ReactDOM from 'react-dom'
import Toast from '../src/Toast'

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

class APP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'init'
        }
    }

    showToast() {
        this.setState({
            message: 'hahaha'
        });
        this.refs.J_toast.show();
    }


    render() {
        return (
            <div>
                <div>
                    <button style={btnStyle} onClick={()=>this.showToast()}>Open</button>
                    <Toast ref='J_toast' duration={3000} className="toast" message={this.state.message}/>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
