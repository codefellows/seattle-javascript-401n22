import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { captainSelector } from "./store";

export default function Captain() {
  const { name } = useParams(); //   => (/captain/Marvel) => {name: "Marvel"}
  const captain = useSelector(captainSelector(name)); // (state) => state.captains.captains["Marvel"];
  /*
  Marvel: {
    name: "Carol Danvers",
    biography:
      "An ex-U.S. Air Force fighter pilot and member of an elite Kree military unit called Starforce. She was imbued with superhuman strength, energy projection, and flight after exposure to Tesseract energy.",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/4/4e/Captain_Marvel_%28film%29_poster.jpg",
  },
  */

  return (
    <>
      <h2>Captain {captain.name}</h2>
      <p>{captain.biography}</p>
      <figure>
        <img src={captain.photo} alt={`Portrait of ${name}`} />
      </figure>
    </>
  );
}
