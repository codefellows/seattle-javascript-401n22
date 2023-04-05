import "./beasts.css";
import Beast from "../Beast";
import { filteredBeasts } from "../../store/beast";
import { useSelector } from "react-redux";

const Beasts = () => {
  const beasts = useSelector(filteredBeasts);
  return (
    <section>
      {beasts.map((beast) => (
        <Beast beast={beast} />
      ))}
    </section>
  );
};

export default Beasts;
