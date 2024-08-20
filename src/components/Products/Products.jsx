import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "../../styles/Products.module.css";

import Loader from "../Loader/Loader.jsx";

const Products = ({ title, style = {}, amount, products = [] }) => {
  //load more btn

  // const [visibleProducts, setVisibleProducts] = useState(amount); //6
  // const productsList = products.slice(1, visibleProducts);
  // const handleClick = () => {
  //   setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5); // Додаємо ще 5 нових продуктів
  // };
  //! попробувати створити перевірку на довжину масиву картинок (якщо довжина !== 3 return)

  const loading = useSelector((state) => state.products.isLoading);
  const list = products.filter((_, i) => i !== 0 && i < amount); //якщо i менше amount воно зберігає його до нового масиву (оскільки у першого немає фото то ми його пропускаємо)

  return (
    <section className={css.products} style={style}>
      {loading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          {title && <h2>{title}</h2>}
          <div className={css.list}>
            {list.map(({ id, images, title, category: { name: cat }, price }) => (
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
          {/* {visibleProducts < products.length && (
            <button
              className={css.button}
              onClick={handleClick}
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "24px",
              }}
            >
              Load more
            </button>
          )} */}
        </>
      )}
    </section>
  );
};

export default Products;
