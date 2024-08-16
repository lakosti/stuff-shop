import AppRoutes from "./AppRoutes/AppRoutes.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./redux/categories/categoriesSlice.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
