import { useState } from "react";
import css from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import { toggleForm } from "../redux/user/userSlice.js";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const closeForm = (value) => dispatch(toggleForm(value));

  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  //беремо динамічні значення з полів вводу через таргет
  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };
  return (
    <div className={css.wrapper}>
      <div className={css.close} onClick={() => closeForm(false)}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <di className={css.title}>Sign Up</di>
      <form className={css.form}>
        <div className={css.group}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
        <div className={css.group}>
          <input
            type="name"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
        <div className={css.group}>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={values.password}
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
        {/* //! спробувати додати можливість завантажувати файли, апі це дозволяє робити */}
        <div className={css.group}>
          <input
            type="avatar"
            placeholder="Add your avatar"
            name="avatar"
            value={values.avatar}
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
        <div className={css.link}>I already have an account</div>
        <button className={css.submit} type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
