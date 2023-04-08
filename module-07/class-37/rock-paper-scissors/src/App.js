import Campaign from "./Components/Campaign";
import Game from "./Components/Game";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <main class="grid">
        <Game />
        <Campaign />
      </main>
    </>
  );
}

export default App;
