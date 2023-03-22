import React, { useContext } from 'react';
import { SettingsContext } from '../context/Settings';
import { ThemeContext } from '../context/Theme';


function Main(props) {
  let settings = useContext(SettingsContext);
  let theme = useContext(ThemeContext);

  const handleChange = (e) => {
    let value = e.target.value;
    settings.changeName(value);
  }

  // noop
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <main className={theme.mode}>
      <form onSubmit={handleSubmit}>
         <label>
          <span>Change the name</span>
          <input placeholder="Enter your name" onChange={handleChange} />
         </label>

         <div>
          <button onClick={theme.toggleMode}>Change the Theme</button>
         </div>
      </form>
    </main>
  );
}

export default Main;
