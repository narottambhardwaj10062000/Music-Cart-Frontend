import styles from "./ListCard.module.css";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useProductContextProvider } from "../../context/ProductContext";
import CardCartBtn from "../../assets/icons/CardCartBtn.png";
import { checkLogin } from "../../apis/auth";
import { AddToCart } from "../../apis/cart";
import { useSnackbar } from "notistack";

const ListCard = ({
  _id,
  brand,
  color,
  headphoneType,
  images,
  model,
  price,
  shortDescription,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setName, isLoggedIn, setIsLoggedIn, cartCount, setCartCount } = useProductContextProvider();

  const handleAddToCart = async () => {
    if (isLoggedIn === false) {
      enqueueSnackbar("Please login first", { variant: "error" });
      navigate("/login");
    } else {
      const response = await AddToCart(_id);
      if (response?.status === 200) {
        setCartCount(response?.data?.totalQuantity);
        enqueueSnackbar(response?.data?.message, { variant: "success" });
      } else if (response?.status === 400) {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      } else if (response?.status === 500) {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      } else {
        enqueueSnackbar("Network Error", { variant: "error" });
      }
    }
  };

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

  return (
    <div className={styles.listCardContainer}>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <img
            src={images?.[0]}
            alt="card-image"
            className={styles.cardImg}
          />
          <img
            src={CardCartBtn}
            alt="cart-btn"
            className={styles.cartIcon}
            onClick={handleAddToCart}
            style={isLoggedIn ? { display: "block" } : { display: "none" }}
          />
        </div>

      </div>

      <div className={styles.cardInfo}>
        <p style={{ fontWeight: "700", fontSize: "3vw" }}>
          {brand} {model}
        </p>
        <p style={{ fontSize: "1.5vw" }}>Price - ₹ {price}</p>
        <p style={{ fontSize: "1vw" }}>
          {color} | {headphoneType}
        </p>
        <p>{shortDescription}</p>
        <div
          className={styles.btn}
          onClick={() => navigate(`/singleProduct/${_id}`)}
        >
          Details
        </div>
      </div>
    </div>
  );
};

export default ListCard;
