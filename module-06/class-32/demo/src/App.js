import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import SettingsContext from './context/Settings';

function App() {
  return (
    <SettingsContext>
      <Header />
      <Main>
        <div>Hello</div>
        <div>World</div>
      </Main>
      <Footer />
    </SettingsContext>
  );
}

export default App;
