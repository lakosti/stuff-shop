import css from "../../styles/Home.module.css";

import bannerBg from "../../image/banner.png";

const Banner = () => {
  return (
    <section className={css.banner}>
      <div className={css.left}>
        <p className={css.content}>
          New Year <span>sale</span>
        </p>
        <button className={css.more}>See more</button>
      </div>
      <div className={css.right} style={{ backgroundImage: `url(${bannerBg})` }}>
        <p className={css.discount}>
          save up to <span>50%</span> off
        </p>
      </div>
    </section>
  );
};

export default Banner;
