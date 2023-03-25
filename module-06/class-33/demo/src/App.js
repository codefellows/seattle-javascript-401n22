import Auth from './auth/Auth.jsx';
import Login from './auth/Login.jsx';
import './app.css'

import LoginContext from './auth/context.jsx';

function App() {
  return (
    <LoginContext>
      <header>
        <Login />
      </header>

      <section>
        <div>All Users can see this</div>

        <Auth>
          <div>If you are logged in, you can see this</div>
        </Auth>

        <Auth capability="create">
          <div>If you are logged in and have "create" permissions, you can see this</div>
        </Auth>

        <Auth capability="update">
          <div>If you are logged in and have "update" permissions, you can see this</div>
        </Auth>

        <Auth capability="delete">
          <div>If you are logged in and have "delete" permissions, you can see this</div>
        </Auth>
      </section>
    </LoginContext>
  );
}

export default App;
