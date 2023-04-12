import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadProducts } from "./products";

function App() {
  const { products } = useSelector(({ products }) => products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return <div>Products: {products.length}</div>;
}

export default App;
