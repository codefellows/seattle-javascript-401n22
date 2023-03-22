import React, {useContext} from 'react';

import { SettingsContext } from '../context/Settings';

function Header() {
  const settings = useContext(SettingsContext);

  return (
    <header>
      <h1>Welcome {settings.name}</h1>
    </header>
  );
}

export default Header;
