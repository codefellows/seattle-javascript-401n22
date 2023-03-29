import React from 'react';
import {LoginContext} from './context.jsx';
import {When} from 'react-if';

class Auth extends React.Component {

 // Doesn't work in a class...
 // const context = useContext(LoginContext);

 // because of this ... we now get this.context
 static contextType = LoginContext;

  render() {
    let youAreLoggedIn = this.context.loggedIn;
    let canDo = this.props.capability ? this.context.can( this.props.capability ) :true;
    let okToRender = youAreLoggedIn && canDo;

    // Conditional Rendering
    // let content  =  okToRender ? this.props.children : null
    // return content;

    return (
      <When condition={okToRender}>
        {this.props.children}
      </When>
    );
  }

}

export default Auth;
