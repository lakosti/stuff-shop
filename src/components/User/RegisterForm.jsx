import { useState } from "react";
import { useDispatch } from "react-redux";

import { register } from "../redux/user/userSlice.js";

import css from "../../styles/User.module.css";
import toast from "react-hot-toast";

const RegisterForm = ({ switchFormType, closeForm }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  //беремо динамічні значення з полів вводу через таргет
  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value }); // values розпилюємо ті значення які уже є
    setErrors({ ...errors, [evt.target.name]: "" });
  };

  //*робимо відправку форми
  const handleSubmit = (evt) => {
    evt.preventDefault();

    //перевіряємо чи всі значення введені (легка перевірка) (чи value === true)
    // const isEmpty = Object.values(values).every((value) => value);
    // if (isEmpty) return;

    // перевіряємо чи всі поля заповнені
    let newErrors = {};
    if (!values.email) newErrors.email = "Email is required!";
    if (!values.name) newErrors.name = "Name is required!";
    if (!values.password) newErrors.password = "Password is required!";
    if (!values.avatar) newErrors.avatar = "Avatar is required!";

    // якщо є помилки, оновлюємо стан і не виконуємо сабміт
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    //*діспатчимо реєстрацію юзера (пост запит)
    dispatch(register(values));
    closeForm();

    toast.success("Registration is successfully!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={css.title}>Sign Up</div>
      <form className={css.form} onSubmit={handleSubmit}>
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
          {errors.email && <p className={css.error}>{errors.email}</p>}
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
          {errors.name && <p className={css.error}>{errors.name}</p>}
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
          {errors.password && <p className={css.error}>{errors.password}</p>}
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
          {errors.avatar && <p className={css.error}>{errors.avatar}</p>}
        </div>
        <div className={css.link} onClick={() => switchFormType("login")}>
          I already have an account
        </div>
        <button className={css.submit} type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
