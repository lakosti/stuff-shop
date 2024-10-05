import { useDispatch, useSelector } from "react-redux";
import { toggleForm, toggleFormType } from "../redux/user/userSlice.js";

import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";

import css from "../../styles/User.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.user.showModal);
  const formType = useSelector((state) => state.user.formType); // по замовчуванню форма реєстрації стоїть

  const switchFormType = (type) => dispatch(toggleFormType(type));

  const closeForm = () => dispatch(toggleForm(false));

  return showModal ? (
    <>
      <div className={css.overlay} onClick={closeForm} />
      {formType === "register" ? (
        <RegisterForm switchFormType={switchFormType} closeForm={closeForm} />
      ) : (
        <LoginForm switchFormType={switchFormType} closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default AuthForm;
