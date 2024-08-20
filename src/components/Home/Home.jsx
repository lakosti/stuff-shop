import { useDispatch, useSelector } from "react-redux";
import { filteredByPrice } from "../redux/products/productsSlice.js";
import { useEffect } from "react";

import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import Banner from "../Banner/Banner.jsx";

import getRandomObjects from "../../utils/shuffleArray.js";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);
  const categories = useSelector((state) => state.categories.list);
  const filtered = useSelector((state) => state.products.filtered);

  // Отримання 5 випадкових об'єктів
  const randomObjects = getRandomObjects(products, 6);
  const randomObjectsFiltered = getRandomObjects(filtered, 6);

  useEffect(() => {
    if (!products.length) return;

    //кладемо 100 - price у payload
    dispatch(filteredByPrice(50));
  }, [dispatch, products.length]);

  return (
    <>
      <Poster />
      <Products products={randomObjects} amount={6} title="Trending" />
      <Categories categories={categories} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={randomObjectsFiltered} amount={6} title="Less than 50$" />
    </>
  );
};

export default Home;
