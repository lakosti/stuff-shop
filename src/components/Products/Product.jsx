import { Link } from "react-router-dom";

import css from "../../styles/Product.module.css";

import { ROUTES } from "../../utils/routes.js";
import { useEffect, useState } from "react";

const SIZES = ["S", "M", "L"];

const Product = ({ images, title, price, description, id }) => {
  //змінюємо головну картинку
  const [currentImg, setCurrentImg] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [purchase, setPurchase] = useState();

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImg(images[0]);
    }
  }, [images]);

  //! зробити щоб покупки змінювались тільки коли змінбєтсья id (при оновленні сторінки все рівно покупки змініються)
  useEffect(() => {
    const randomPurchases = (max, min) => {
      setPurchase(Math.floor(Math.random() * max - min));
    };

    randomPurchases(30, 1);
  }, [id]);

  return (
    <section className={css.product}>
      <div className={css.images}>
        <div
          className={css.current}
          style={{ backgroundImage: `url(${currentImg})` }}
        />
        <div className={css["images-list"]}>
          {images.map((img, i) => (
            <div
              key={img}
              className={css.image}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => setCurrentImg(img)}
            />
          ))}
        </div>
      </div>

      <div className={css.info}>
        <h1 className={css.title}>{title}</h1>
        <div className={css.price}>{price}$ </div>
        <div className={css.sizes}>
          <span>Sizes: </span>
          <div className={css.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                key={size}
                className={`${css.size} ${
                  currentSize === size ? css.active : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={css.description}>{description}</p>

        <div className={css.actions}>
          <button className={css.add} disabled={!currentSize}>
            Add to cart
          </button>
          <button className={css.favourite}>Add to favourites</button>
        </div>

        <div className={css.bottom}>
          <div className={css.purchase}>{purchase} people purchased</div>
          <Link to={ROUTES.HOME}>Go to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
