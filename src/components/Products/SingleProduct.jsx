import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getProductById } from "../redux/products/productsSlice.js";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await dispatch(getProductById(id));
        setProduct(result.payload);
        console.log(result.payload);
      } catch (err) {
        setError("Error fetching product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  //попросити пояснити чат для чого індекси
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price {product.price}$</p>
      <div style={{ display: "flex", gap: "10px", width: "300px" }}>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "20px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            &#10094;
          </button>
          <img
            src={product.images[currentImageIndex]}
            alt="Large product"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "20px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            &#10095;
          </button>
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            &#10005;
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
