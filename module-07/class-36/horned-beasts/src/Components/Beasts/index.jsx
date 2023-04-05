import "./beasts.css";
import Beast from "../Beast";

const BEASTS = require("../../data.json");

const Beasts = () => (
  <section>
    {BEASTS.map((beast) => (
      <Beast beast={beast} />
    ))}
  </section>
);

export default Beasts;
