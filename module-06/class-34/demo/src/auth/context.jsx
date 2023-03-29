import React from 'react';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: null,
      user: { capabilities: [] },
      login: this.login,
      logout: this.logout,
      can: this.can
    };
  }

  login = async ( username, password ) => {

    let url = process.env.REACT_APP_API;

    const axiosRequest = {
      url: `${url}/signin`,
      method: 'post',
      auth: {
        username, password
      }
    }
    let response = await axios(axiosRequest)
    const {token} = response.data;

    if(token) {
       try {
         this.validateToken(token);
       } catch(e) {
         this.setLoginState( false, null, {}, e.message );
       }
    } else {
       this.setLoginState( false, null, {}, { message: "Invalid User"} );
    }

  }

  validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      this.setLoginState( true, token, validUser );
    } catch(e) {
      this.setLoginState( false, null, {}, e.message );
    }
  }

  setLoginState = (loggedIn, token, user, error) => {
    this.setState( {loggedIn, token, user, error } );
    localStorage.setItem( 'auth', token );
  }

  logout = () => {
      this.setLoginState( false, null, {} );
  }

  can = (capability) => {
    return this?.state?.user?.capabilities?.includes(capability);
  }

  componentDidMount() {
    const token = localStorage.getItem('auth');
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }

}

export default LoginProvider;
