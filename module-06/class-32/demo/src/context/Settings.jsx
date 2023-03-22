import React, {useState} from 'react';

export const SettingsContext  = React.createContext();

function SettingsProvider(props) {
  const [name, setName] = useState('Nobody');

   // Proxy Function
   const changeName = (newName) => {
    // newName = newName.toUpperCase();
    setName(newName);
   };

   let exportedSettings = {
     name,
     changeName
   }

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
