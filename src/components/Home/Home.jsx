import { useDispatch, useSelector } from "react-redux";
import { filteredByPrice } from "../redux/products/productsSlice.js";
import { useEffect } from "react";

import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import Banner from "../Banner/Banner.jsx";

const Home = () => {
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products.productsList);
  // const categories = useSelector((state) => state.categories.categoriesList);

  const {
    products: { productsList, filtered },
    categories,
  } = useSelector((state) => state);

  console.log(productsList);
  useEffect(() => {
    if (!productsList.length) return;

    //кладемо 100 - price у payload
    dispatch(filteredByPrice(100));
  }, [dispatch, productsList.length]);

  // Функція для перемішування масиву
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Функція для вибору кількох випадкових об'єктів з масиву
  function getRandomObjects(array, numberOfObjects) {
    const shuffled = shuffleArray([...array]);
    return shuffled.slice(0, numberOfObjects);
  }

  // Отримання 5 випадкових об'єктів з productsList
  const randomObjects = getRandomObjects(productsList, 6);

  return (
    <>
      <Poster />
      <Products products={randomObjects} amount={6} title="Trending" />
      <Categories categories={categories.categoriesList} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={6} title="Less than 100$" />
    </>
  );
};

export default Home;
