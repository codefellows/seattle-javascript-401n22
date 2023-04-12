import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadProducts, updateProduct } from "./products";

function App() {
  const { products } = useSelector(({ products }) => products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const doUpdateProduct = () => {
    dispatch(updateProduct({ product: products[0], stockAmount: -2 }));
  };

  return (
    <>
      <div>Products: {products.length}</div>
      <button onClick={doUpdateProduct}>Update</button>
    </>
  );
}

export default App;
