import styles from "./Card.module.css";
import React, { useState, useEffect, useRef } from "react";
import CardCartBtn from "../../assets/icons/CardCartBtn.png";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../../apis/cart";
import { useProductContextProvider } from "../../context/ProductContext";
import { useSnackbar } from "notistack";
import { checkLogin } from "../../apis/auth";

const Card = ({ imageUrl, productId, cardType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setName, isLoggedIn, setIsLoggedIn } = useProductContextProvider();

  const handleCheckLogin = async () => {
    const response = await checkLogin();
    if (response.status === 200) {
      setIsLoggedIn(true);
      setName(response?.data?.name);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  const handleAddToCart = async () => {
    if (isLoggedIn === false) {
      enqueueSnackbar("Please login first", { variant: "error" });
      navigate("/login");
    }
    
    const response = await AddToCart(productId);
    if (response?.status === 200) {
      setCartCount(response?.data?.totalQuantity);
      enqueueSnackbar(response?.data?.message, { variant: "success" });
    }
    else if (response?.status === 400) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }

  };

  const navigate = useNavigate();
  const { cartCount, setCartCount } = useProductContextProvider();

  const handleClick = () => {
    navigate(`/singleProduct/${productId}`)
  };

  return (
    <div className={styles.cardContainer}>
      <img
        src={imageUrl}
        alt="card-image"
        className={styles.cardImg}
        onClick={() => handleClick()}
      />
      <img
        src={CardCartBtn}
        alt="cart-btn"
        className={styles.cartIcon}
        onClick={handleAddToCart}
        style={isLoggedIn ? { display: "block" } : { display: "none" }}
      />
    </div>
  );
};

export default Card;
