import { useSelector } from "react-redux";

function App() {
  const { products } = useSelector(({ products }) => products);

  return <div>Products: {products.length}</div>;
}

export default App;
