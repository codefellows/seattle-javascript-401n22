import { useState } from "react";
import "./App.css";
import { CookieForm } from "./components/CookieForm";
// import { Header } from "./components/header";
// import { Footer } from "./components/footer";
import { CookieTable, CookieStand } from "./components/CookieTable";

function App() {
  const [stores, setStores] = useState<CookieStand[]>([
    new CookieStand("Seattle", 23, 65, 6.3),
    new CookieStand("Tokyo", 3, 24, 1.2),
    new CookieStand("Dubai", 11, 38, 3.7),
    new CookieStand("Paris", 20, 38, 2.3),
    new CookieStand("Lima", 2, 16, 4.6),
  ]);

  return (
    <>
      <header className="fluid">
        <h1>Sam 'n Cookies</h1>
      </header>
      <main className="fluid">
        <CookieTable stores={stores} />
        <CookieForm
          onAddStore={(newStore: CookieStand): void => {
            // add new store to exising array of stores
            // stores.push(store);
            const newStores = [...stores, newStore];
            setStores(newStores);

            // const newStores = [...stores, newStore]

            // const newStores = [];
            // for (let i = 0; i < stores.length; i++) {
            //   const store = stores[i];
            //   newStores.push(store);
            // }
            // newStores.push(newStore)
          }}
        />
      </main>
    </>
  );
}

export default App;
