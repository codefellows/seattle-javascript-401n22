import "./beasts.css";
import Beast from "../Beast";
import { filteredBeasts, loadBeasts } from "../../store/beast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Beasts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBeasts());
  }, [dispatch]);
  const beasts = useSelector(filteredBeasts);
  return (
    <section>
      {beasts.map((beast) => (
        <Beast beast={beast} key={beast.title} />
      ))}
    </section>
  );
};

export default Beasts;
