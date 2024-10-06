import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { logOut, update } from "../redux/user/userSlice.js";

import css from "../../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    //вставновлюємо дані із стейна в поля вводу і збираємо дані із полів вводу і відправляємо в стейт
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(update(values));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate(ROUTES.HOME);
  };

  return (
    <section className={css.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <div className={css.wrap}>
          <button className={css.logOut} onClick={handleLogOut}>
            Log out
          </button>
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
            <div className={`${css.group} ${css.position}`}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={values.password}
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <span className={css.visible} onClick={togglePasswordVisibility}>
                {isPasswordVisible ? "Hide" : "Show"}
              </span>
            </div>
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

            <button className={css.submit} type="submit">
              Update info
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Profile;
