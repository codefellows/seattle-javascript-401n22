import { useSelector } from "react-redux";
import { listCaptainsSelector } from "./store";
import { Link } from "react-router-dom";

export default function Navigation() {
  const captains = useSelector(listCaptainsSelector);

  return (
    <aside>
      <nav>
        <ul>
          {captains.map((id) => (
            <li key={id}>
              {/* <a href={`/captain/${id}`}>{id}</a> */}
              <Link to={`/captain/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
