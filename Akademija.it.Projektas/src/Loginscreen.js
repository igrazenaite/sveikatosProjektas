import React, { Component } from 'react';
import Login from './Login';

class Loginscreen extends Component {
 
    state = {
      username: '',
      password: '',
      loginmessage: '',

      isLogin: true
    
  }

  render() {

    return (
      <div className="loginscreen">
      {/* gets login component from Login Class */}
        <Login parentContext={this} appContext={this.props.parentContext} />
        <div >
          {this.state.loginmessage}
        </div>
        <div >
          statistaika
          </div>
      </div>
    );
  }
}
export default Loginscreen;