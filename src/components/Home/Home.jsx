import { useSelector } from "react-redux";

import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import Banner from "../Banner/Banner.jsx";

const Home = () => {
  // const products = useSelector((state) => state.products.productsList);
  const { products, categories } = useSelector((state) => state);

  return (
    <>
      <Poster />
      <Products products={products.productsList} amount={6} title="Trending" />
      <Categories categories={categories.categoriesList} amount={5} title="Worth seeing" />
      <Banner />
    </>
  );
};

export default Home;
