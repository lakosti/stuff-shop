import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { useGetProductQuery } from "../../api/apiSlice.js";
import {
  getProductById,
  getRelatedProducts,
} from "../redux/products/productsSlice.js";

import { ROUTES } from "../../utils/routes.js";

import Products from "./Products.jsx";
import Product from "./Product.jsx";
import Loader from "../Loader/Loader.jsx";

const SingleProduct = () => {
  // const { data, isSuccess, isRefreshing, isLoading } = useGetProduct({ id });
  // if ( !isSuccess && !isRefreshing && !isLoading) {
  //   navigate(ROUTES.HOME);
  // }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const related = useSelector((state) => state.products.related);
  // const list = useSelector((state) => state.products.list);
  const { related, list } = useSelector(({ products }) => products);

  const loading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getProductById(id));

        const { payload } = res; //у payload приходить відповідь від бека (будь то помилка чи дані)
        if (payload === "Request failed with status code 400") {
          //створити сторінку Not found
          navigate(ROUTES.HOME);
        }
        // console.log(payload);
        setProduct(payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (!product || !list.length) return; //якщо немає даних або немає елементів в ліст то виходь

    dispatch(getRelatedProducts(product.category.id)); // по айді категорії шукаємо такі самі товари з даної категорії
  }, [dispatch, product, list.length]);

  return (
    <>
      {product ? (
        <>
          <Product
            // title={product.title}
            // price={product.price}
            // description={product.description}
            // images={product.images}
            {...product}
          />
          <Products products={related} amount={6} title="Releted products" />
        </>
      ) : (
        <section>
          <Loader>Loading</Loader>
        </section>
      )}
    </>
  );
};

export default SingleProduct;

// const SingleProduct = () => {
//   const dispatch = useDispatch();

//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { payload } = await dispatch(getProductById(id));
//         setProduct(payload);
//         console.log(payload);
//       } catch (err) {
//         setError("Error fetching product");
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   //попросити пояснити чат для чого індекси
//   const openModal = (index) => {
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div>
//       <h1>{product.title}</h1>
//       <p>Price {product.price}$</p>
//       <div style={{ display: "flex", gap: "10px", width: "300px" }}>
//         {product.images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt=""
//             style={{ cursor: "pointer" }}
//             onClick={() => openModal(index)}
//           />
//         ))}
//       </div>

//       {isModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.8)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <button
//             onClick={prevImage}
//             style={{
//               position: "absolute",
//               left: "20px",
//               backgroundColor: "transparent",
//               color: "white",
//               border: "none",
//               fontSize: "2rem",
//               cursor: "pointer",
//             }}
//           >
//             &#10094;
//           </button>
//           <img
//             src={product.images[currentImageIndex]}
//             alt="Large product"
//             style={{ maxWidth: "80%", maxHeight: "80%" }}
//           />
//           <button
//             onClick={nextImage}
//             style={{
//               position: "absolute",
//               right: "20px",
//               backgroundColor: "transparent",
//               color: "white",
//               border: "none",
//               fontSize: "2rem",
//               cursor: "pointer",
//             }}
//           >
//             &#10095;
//           </button>
//           <button
//             onClick={closeModal}
//             style={{
//               position: "absolute",
//               top: "20px",
//               right: "20px",
//               backgroundColor: "transparent",
//               color: "white",
//               border: "none",
//               fontSize: "2rem",
//               cursor: "pointer",
//             }}
//           >
//             &#10005;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleProduct;
