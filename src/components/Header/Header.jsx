import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ROUTES } from "../../utils/routes.js";
import { toggleForm } from "../redux/user/userSlice.js";
import { filteredByTitle } from "../redux/products/productsSlice.js";

import logo from "../../image/logo.svg";
import avatar from "../../image/avatar.svg";

import css from "../../styles/Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "Guest", avatar: avatar });
  const [searchValue, setSearchValue] = useState("");

  const currentUser = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.user.cart);
  const favourites = useSelector((state) => state.user.favourites);
  const items = useSelector((state) => state.products.searchItems);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    } else {
      setValues({ name: "Guest", avatar: avatar });
    }
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = (evt) => {
    const value = evt.target.value;

    setSearchValue(value);
    dispatch(filteredByTitle(value));
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
              backgroundPosition: "center",
              backgroundImage: `url(${values.avatar})`,
            }}
          />
          <div className={css.username}>{values.name}</div>
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
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && items.length > 0 ? (
            <div className={css.box}>
              {items.map(({ title, images, id }) => (
                <div
                  key={id}
                  onClick={() => {
                    setSearchValue("");
                    dispatch(filteredByTitle(""));
                  }}
                >
                  <Link className={css.item} to={`/products/${id}`}>
                    <div
                      className={css.image}
                      style={{ backgroundImage: `url(${images[0]})` }}
                    ></div>
                    <div className={css.title}>{title}</div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            searchValue && (
              <div className={css.box}>
                <p className={css.item}>Not found</p>
              </div>
            )
          )}
        </form>
        <div className={css.account}>
          <Link to={ROUTES.FAVOURITES} className={css.favourites}>
            <svg className={css["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            <span className={css.count}>{favourites.length || 0}</span>
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
