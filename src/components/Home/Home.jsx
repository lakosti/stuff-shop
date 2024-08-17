import { useSelector } from "react-redux";
import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";

const Home = () => {
  const products = useSelector((state) => state.products.productsList);

  return (
    <>
      <Poster />
      <Products products={products} amount={6} title="Trending" />
    </>
  );
};

export default Home;
