import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import SettingsContext from './context/Settings';
import ThemeContext from './context/Theme';

function App() {
  return (
    <ThemeContext>
      <SettingsContext>
        <Header />
        <Main>
          <div>Hello</div>
          <div>World</div>
        </Main>
        <Footer />
      </SettingsContext>
    </ThemeContext>
  );
}

export default App;
