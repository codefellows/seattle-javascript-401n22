import { useDispatch } from "react-redux";
import beastSlice from "../../store/beast";

const Horns = () => {
  const dispatch = useDispatch();
  return (
    <select
      onChange={(e) => {
        const horns = e.target.value;
        dispatch(
          beastSlice.actions.setHornCount(
            horns === "" ? undefined : Number(horns)
          )
        );
      }}
    >
      <option value="">All</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="100">💯</option>
    </select>
  );
};

export default Horns;
