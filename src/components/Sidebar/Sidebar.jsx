import { NavLink } from "react-router-dom";
import css from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={css.sidebar}>
      <div className={css.title}>categories</div>
      <nav>
        <ul className={css.menu}>
          <li>
            <NavLink to={`/categories/${1}`}>Link</NavLink>
          </li>
        </ul>
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
