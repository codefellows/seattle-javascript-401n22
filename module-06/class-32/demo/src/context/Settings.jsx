import React, {useState, useEffect} from 'react';

export const SettingsContext  = React.createContext();

function SettingsProvider(props) {
  const [name, setName] = useState('Nobody');
  const [num, setNum] = useState(10);

   // Proxy Function
   const changeName = (newName) => {
    localStorage.setItem('name', newName);
    setName(newName);
   };

  const changeNumber = (newNumber) => {
    newNumber = Number(newNumber);
    localStorage.setItem('number', newNumber);
    setNum(newNumber);
  };

  useEffect( () => {
    let savedName = localStorage.getItem('name');
    let savedNum = localStorage.getItem('number');
    changeNumber(savedNum);
    changeName(savedName);
  },[]);

   let exportedSettings = {
     name,
     num,
     changeNumber,
     changeName
   }

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
