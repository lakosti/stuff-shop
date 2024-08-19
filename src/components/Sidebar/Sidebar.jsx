import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "../../styles/Sidebar.module.css";
import Loader from "../Loader/Loader.jsx";

const Sidebar = () => {
  const list = useSelector((state) => state.categories.categoriesList);
  const loading = useSelector((state) => state.categories.isLoading);

  return (
    <section className={css.sidebar}>
      <div className={css.title}>categories</div>
      <nav>
        {loading ? (
          <Loader>Loading</Loader>
        ) : (
          <ul className={css.menu}>
            {list.map(({ name, id }) => (
              <li key={id}>
                <NavLink
                  to={`/categories/${id}`}
                  // якщо лінка активна то підсвічуємо (аналогія до clsx  or classname)
                  className={({ isActive }) => `${css.link} ${isActive ? css.active : ""}`}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className={css.footer}>
        <a href="/help" target="_blank" className={css.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={css.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
