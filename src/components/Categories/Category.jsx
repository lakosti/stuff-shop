import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import css from "../../styles/Category.module.css";

const Category = () => {
  const { id } = useParams(); //! ID --- ПРИХОДИТЬ У ВИГЛЯДІ СТРОКИ !!!!!!!!

  const list = useSelector((state) => state.products.list);

  const categoriesList = list.filter(
    ({ category }) => category.id === parseInt(id)
  );
  const categoryName =
    categoriesList.length > 0 ? categoriesList[0].category.name : "Loading..."; // 0 ? categoriesList[0] before loading data can be underfined, then do this check // categoriesList[0] thats means you take first item from array of objects

  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>{categoryName}</h2>

      <form className={css.filters} onSubmit={() => {}}></form>
    </section>
    // <div>
    //   {categoriesList.map(({ title, price, description, images }) => (
    //     <li key={title} style={{ display: "flex", gap: "10px" }}>
    //       <h3>{title}</h3>
    //       <p>{price}</p>
    //       {/* <p>{description}</p> */}
    //       <img src={images[0]} alt={title} width={200} />
    //       <div style={{ backgroundImage: `url(${images[0]})` }}></div>
    //     </li>
    //   ))}
    // </div>
  );
};

export default Category;
