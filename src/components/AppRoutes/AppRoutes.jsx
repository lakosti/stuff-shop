import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../utils/routes.js";

import Home from "../Home/Home.jsx";
import SingleProduct from "../Products/SingleProduct.jsx";
import Profile from "../Profile/Profile.jsx";

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} />
  </Routes>
);

export default AppRoutes;
