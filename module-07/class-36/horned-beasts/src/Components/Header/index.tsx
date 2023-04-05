import Horns from "../Horns";

const Header = () => (
  <header
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <h1>Horned Beasts</h1>
    <Horns />
  </header>
);

export default Header;
