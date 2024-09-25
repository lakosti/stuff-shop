import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes.js";

import logo from "../../image/logo.svg";
import avatar from "../../image/avatar.svg";

import css from "../../styles/Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  //*потрібно зрозуміти чи є зараз залогінений користувач, якщо да показуємо модалку
  const currentUser = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.user.cart);

  //якщо немає юзера покажи моддалку для реєстрації
  const handleClick = () => {
    if (!currentUser) {
    }
  };

  return (
    <div className={css.header}>
      <div className={css.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="Stuff" />
        </Link>
      </div>

      <div className={css.info}>
        <div className={css.user} onClick={handleClick}>
          <div
            className={css.avatar}
            style={{
              backgroundSize: "auto",
              backgroundImage: `url(${avatar})`,
            }}
          />
          <div className={css.username}>Guest</div>
        </div>

        <form className={css.form}>
          <div className={css.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={css.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onChange={() => {}}
              value=""
            />
          </div>
          {false && <div className={css.box}></div>}
        </form>
        <div className={css.account}>
          <Link to={ROUTES.HOME} className={css.favourites}>
            <svg className={css["icon-fav"]}>
              {/* зберегти оригінальне ім'я  ["icon-fav"]*/}
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={css.cart}>
            <svg className={css["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <span className={css.count}>{quantity.length || 0}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
