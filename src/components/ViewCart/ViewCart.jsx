import React from "react";
import styles from "./ViewCart.module.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useProductContextProvider } from "../../context/ProductContext";

const ViewCart = () => {
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useProductContextProvider();

  return (
    <div
      className={styles.cartBtn}
      onClick={() => navigate("/cart")}
      style={{ cursor: "pointer" }}
    >
      <MdOutlineShoppingCart
        style={{ color: "#FFFFFF", height: "27px", width: "26px" }}
      />
      <p>View Cart</p>
      <p style={{ paddingLeft: "0.5rem" }}>{cartCount}</p>
    </div>
  );
};

export default ViewCart;
