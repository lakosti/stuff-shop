import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "../../styles/Categories.module.css";
import Loader from "../Loader/Loader.jsx";

const Categories = ({ title, amount, categories = [] }) => {
  const categoriesList = categories.filter((_, i) => i < amount);
  const loading = useSelector((state) => state.products.isLoading);

  return (
    <section className={css.section}>
      {loading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <h2>{title}</h2>
          <div className={css.list}>
            {categoriesList.map(({ id, name, image }) => (
              <Link to={`/categories/${id}`} key={id} className={css.item}>
                <div className={css.image} style={{ backgroundImage: `url(${image})` }} />
                <h3 className={css.title}>{name}</h3>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Categories;
