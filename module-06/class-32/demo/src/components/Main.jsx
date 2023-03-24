import React, { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../context/Settings';
import { ThemeContext } from '../context/Theme';

function Main(props) {
  let settings = useContext(SettingsContext);
  let theme = useContext(ThemeContext);
  const [people, setPeople] = useState([]);

  const handleChangeName = (e) => {
    let value = e.target.value;
    settings.changeName(value);
  }

  const handleChangeNumber = (e) => {
    let value = e.target.value;
    settings.changeNumber(Number(value));
  }

  // noop
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect( () => {
    let p = [ 'John', 'Cathy', 'Zach', 'Allie', 'Rosie', 'Mom', 'Dad']
    setPeople(p);
  }, []);

  useEffect( () => {
    if( settings.num > people.length) {
      alert('You cannot do that');
    }
  }, [settings.num]);

  const start = 0;
  const end = start + settings.num;
  const displayNames = people.slice(start, end);

  return (
    <main className={theme.mode}>

      We're only supposed to show {settings.num} people here.

      <ul>
        {
          displayNames.map(person =>
             <li key={person}>{person}</li>
          )
        }
      </ul>

      <form onSubmit={handleSubmit}>

        <div>
        <label>
          <span>How Many to Show?</span>
          <input type="number" onChange={handleChangeNumber} />
        </label>
        </div>

        <div>
         <label>
          <span>Change the name</span>
          <input placeholder="Enter your name" onChange={handleChangeName} />
         </label>
        </div>

         <div>
          <button onClick={theme.toggleMode}>Change the Theme</button>
         </div>
      </form>
    </main>
  );
}

export default Main;
