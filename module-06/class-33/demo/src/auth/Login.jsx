import React from 'react';
import {If, Then, Else} from 'react-if';
import {LoginContext} from './context.jsx';

class Login extends React.Component {

  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login( this.state.username, this.state.password);
  }

  handleChange = (e) => {
    this.setState( { [e.target.name] :e.target.value } );
  }

  render() {
      return (
        <If condition = {this.context.loggedIn}>
          <Then>
              <button onClick={this.context.logout}>Log Out</button>
          </Then>
          <Else>
              <form onSubmit={this.handleSubmit}>
                <input name="username" onChange={this.handleChange} placeholder="login id" />
                <input name="password" onChange={this.handleChange} type="password" placeholder="password" />
                <button>Login</button>
              </form>
          </Else>
        </If>
      )
  }

}

export default Login;
