import React, { useContext } from 'react';
import { SettingsContext } from '../context/Settings';

function Footer() {
  const settings = useContext(SettingsContext);
  return (
    <footer>
      <div>&copy; 2023 {settings.name}</div>
    </footer>
  );
}

export default Footer;
