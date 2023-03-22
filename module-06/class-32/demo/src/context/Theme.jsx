import React, {useState} from 'react';

export const ThemeContext = React.createContext();

const Theme =  (props) => {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    // if light, go dark, if dark, go light
    setMode( mode === 'light' ? 'dark' : 'light' );
  }

  const values = { mode, toggleMode };

  return (
    <ThemeContext.Provider value={values}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default Theme;
