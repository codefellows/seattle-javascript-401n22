import { useDispatch, useSelector } from "react-redux";
import beastSlice from "../../store/beast";

const BeastModal = () => {
  const beast = useSelector((state) => state.beast.selectedBeast);
  const dispatch = useDispatch();

  return (
    <dialog
      open={beast !== undefined}
      style={{
        display: "sticky",
        inset: 0,
        padding: "20px",
      }}
    >
      <article>
        <header>
          <h2>{beast?.title}</h2>
        </header>
        <main>
          <figure>
            <img src={beast?.image_url} width="400px" alt={beast?.keyword} />
          </figure>
          <p>{beast?.description}</p>
        </main>
        <footer>
          <button
            onClick={() => {
              dispatch(beastSlice.actions.showBeast(undefined));
            }}
          >
            Close
          </button>
        </footer>
      </article>
    </dialog>
  );
};

export default BeastModal;
