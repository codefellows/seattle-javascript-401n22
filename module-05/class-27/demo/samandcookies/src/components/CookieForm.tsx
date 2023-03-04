import { useState } from "react";
import { CookieStand } from "./CookieTable";

// (props: {onAddStore: (store: CookieStand) => void })
// Props is an object
//  that has a property onAddStore
//  onAddStore is type function
//    which has one argument, that is type CookieStand
//    and the function returns nothing, that is, type "void"

export const CookieForm = ({
  onAddStore,
}: {
  onAddStore: (store: CookieStand) => void;
}) => {
  // const [value, setValue] = useState("initial");
  const [location, setLocation] = useState("");
  const [minCustomers, setMinCustomers] = useState(0);
  const [maxCustomers, setMaxCustomers] = useState(0);
  const [avgCookiesPerSale, setAvgCookiesPerSale] = useState(0);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newStore = new CookieStand(
            location,
            minCustomers,
            maxCustomers,
            avgCookiesPerSale
          );
          onAddStore(newStore);
        }}
      >
        <label>
          Location{" "}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Min Customers{" "}
          <input
            type="number"
            value={minCustomers}
            onChange={(e) => setMinCustomers(Number(e.target.value))}
          />
        </label>
        <label>
          Max Customers{" "}
          <input
            type="number"
            value={maxCustomers}
            onChange={(e) => setMaxCustomers(Number(e.target.value))}
          />
        </label>
        <label>
          Average Cookies Per Sale{" "}
          <input
            type="number"
            value={avgCookiesPerSale}
            onChange={(e) => setAvgCookiesPerSale(Number(e.target.value))}
          />
        </label>
        <button type="submit">Add store</button>
      </form>

      <div>Location: {location}</div>
      <div>Min Customers: {minCustomers}</div>
      <div>Max Customers: {maxCustomers}</div>
      <div>Avg Sale: {avgCookiesPerSale}</div>
    </>
  );
};
