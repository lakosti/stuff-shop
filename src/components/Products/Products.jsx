import { Link } from "react-router-dom";

import css from "../../styles/Products.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Products = ({ title, style = {}, amount, products = [] }) => {
  const [visibleProducts, setVisibleProducts] = useState(amount); //6

  const loading = useSelector((state) => state.products.isLoading);

  // беремо лише перші 5 продуктів (amount = 5)
  // const productsList = products.filter((_, i) => i !== 0 && i < amount); //якщо i менше amount воно зберігає його до нового масиву (оскільки у  першого немає фото то ми його пропускаємо)
  const productsList = products.slice(1, visibleProducts);

  const handleClick = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5); // Додаємо ще 5 нових продуктів
  };
  console.log(products);
  return (
    <section className={css.products} style={style}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {title && <h2>{title}</h2>}
          <div className={css.list}>
            {productsList.map(({ id, images, title, category: { name: cat }, price }) => (
              <Link to={`/products/${id}`} key={id} className={css.product}>
                <div className={css.image} style={{ backgroundImage: `url(${images[0]})` }} />
                <div className={css.wrapper}>
                  <h3 className={css.title}>{title}</h3>
                  <div className={css.cat}>{cat}</div>
                  <div className={css.info}>
                    <div className={css.prices}>
                      <div className={css.price}>{price}$</div>
                      <div className={css.oldPrice}>{Math.floor(price * 0.8)}$</div>
                    </div>
                    <div className={css.purchases}>
                      {Math.floor(Math.random() * 20 + 1)} purchased
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {visibleProducts < products.length && (
            <button className={css.button} onClick={handleClick}>
              Load more
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Products;

// category: {id: 1, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg'}
// description: "Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit."
// id: 11
// images: (3) ['["https://i.imgur.com/cBuLvBi.jpeg"', '"https://i.imgur.com/N1GkCIR.jpeg"', '"https://i.imgur.com/kKc9A5p.jpeg"]']
// price: 3500
// title: "Classic Red Baseball Captttt"
