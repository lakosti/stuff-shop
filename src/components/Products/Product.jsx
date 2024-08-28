import { Link } from "react-router-dom";

import css from "../../styles/Product.module.css";

import { ROUTES } from "../../utils/routes.js";

const SIZES = [4, 4.5, 5];

const Product = ({ images, title, price, description }) => {
  const currentImg = images[0];

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
              key={i}
              className={css.image}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => {}}
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
              <div onClick={() => {}} key={size} className={`${css.size}`}>
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={css.description}>{description}</p>

        <div className={css.actions}>
          <button className={css.add}>Add to cart</button>
          <button className={css.favourite}>Add to favourites</button>
        </div>

        <div className={css.bottom}>
          <div className={css.purchase}>
            {Math.floor(Math.random() * 30 - 1)} people purchased
          </div>
          <Link to={ROUTES.HOME}>Go to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
