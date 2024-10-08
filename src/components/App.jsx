import { Toaster } from "react-hot-toast";

import AppRoutes from "./AppRoutes/AppRoutes.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getCategories } from "./redux/categories/categoriesSlice.js";
import { getProducts } from "./redux/products/productsSlice.js";
import AuthForm from "./User/AuthForm.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <div>
        <Toaster position="top-right" />
      </div>
      <Header />
      <AuthForm />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
