import { useDispatch } from "react-redux";
import "./beast.css";
import beastSlice from "../../store/beast";

const Beast = ({ beast }) => {
  const dispatch = useDispatch();
  return (
    <article className="Beast">
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2>{beast.title}</h2>
        <button
          onClick={() => {
            dispatch(beastSlice.actions.showBeast(beast));
          }}
        >
          Open
        </button>
      </header>
      <main>
        <figure>
          <img src={beast.image_url} width="200px" alt={beast.keyword} />
        </figure>
        <p>{beast.description}</p>
      </main>
    </article>
  );
};

export default Beast;
