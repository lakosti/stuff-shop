import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes.js";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, toggleFavourite } from "../redux/user/userSlice.js";

import css from "../../styles/Product.module.css";

const SIZES = ["S", "M", "L"];

const Product = (item) => {
  const { images, title, price, description, id } = item;

  const currentUser = useSelector((state) => state.user.currentUser);
  const favourites = useSelector((state) => state.user.favourites);

  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState(); //змінюємо головну картинку
  const [currentSize, setCurrentSize] = useState("");
  const [purchase, setPurchase] = useState();
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImg(images[0]);
    }
  }, [images]);

  //!зробити додавання кількості через кнопку + зробити кнопку add to btn disabled якщо товар уже в корзині
  //! зробити щоб покупки змінювались тільки коли змінбєтсья id (при оновленні сторінки все рівно покупки змініються)
  useEffect(() => {
    const randomPurchases = (max, min) => {
      setPurchase(Math.floor(Math.random() * max - min) + min);
    };

    randomPurchases(30, 1);
  }, [id]);

  //*перевірка чи є хоч один елемент по такому айді у fav list
  useEffect(() => {
    const isExists = favourites.some(({ id: favId }) => favId === id);
    setFavourite(isExists);
  }, [id, favourites]);

  const handleSizeSelect = (size) => {
    setCurrentSize(size); // Оновлюємо вибраний розмір
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, size: currentSize })); //item = payload
    toast("Successfully added to cart!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleAddToFavList = () => {
    if (!currentUser) {
      toast.error("Please login to add to favourites", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    dispatch(toggleFavourite(item));
    setFavourite((prev) => !prev);
  };

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
                onClick={() => handleSizeSelect(size)}
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

        {/* ЗРОБИТИ ТАК ЩОБ ПРИ КЛІКУ НА ADD TO CART ВІДКРИВАЛАСЬ МОДАЛКА */}
        <div className={css.actions}>
          <button
            onClick={handleAddToCart}
            className={css.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={css.favourite} onClick={handleAddToFavList}>
            {favourite ? "Remove from favorites" : "Add to favorites"}
          </button>
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
