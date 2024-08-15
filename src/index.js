import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//components
import App from "./components/App.jsx";

//global import
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
