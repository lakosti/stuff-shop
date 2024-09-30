import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "./RegisterForm.jsx";

import css from "../../styles/User.module.css";
import { toggleForm } from "../redux/user/userSlice.js";

const AuthForm = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.user.showModal);

  const closeForm = (value) => dispatch(toggleForm(value));

  return showModal ? (
    <>
      <div className={css.overlay} onClick={() => closeForm(false)} />
      <RegisterForm />
    </>
  ) : (
    <></>
  );
};

export default AuthForm;
