import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes.js";

import logo from "../../img/logo.svg";

import css from "../../styles/Footer.module.css";

const Footer = () => (
  <section className={css.footer}>
    <div className={css.logo}>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="Stuff" />
      </Link>
    </div>
    <div className={css.rights}>
      Developed by{" "}
      <a href="https://github.com/lakosti" target="_blank" rel="noreferrer">
        lakosti
      </a>
    </div>
    <div className={css.socials}>
      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        <svg className={css["icon-cart"]}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
        </svg>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <svg className={css["icon-cart"]}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
        </svg>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <svg className={css["icon-cart"]}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
        </svg>
      </a>
    </div>
  </section>
);

export default Footer;
