import "./beasts.css";
import Beast from "../Beast";
import { useSelector } from "react-redux";

const Beasts = () => {
  const beasts = useSelector((state) => state.beast.beasts);

  return (
    <section>
      {beasts.map((beast) => (
        <Beast beast={beast} />
      ))}
    </section>
  );
};

export default Beasts;
