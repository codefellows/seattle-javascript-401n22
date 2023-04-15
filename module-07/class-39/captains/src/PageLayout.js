import { Link, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function PageLayout() {
  return (
    <>
      <header className="fluid">
        <nav>
          <h1>
            <Link to="/">Captains</Link>
          </h1>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Navigation />
      <footer>&copy; 2023 David Souther & Code Fellows (js 401 n22)</footer>
    </>
  );
}
