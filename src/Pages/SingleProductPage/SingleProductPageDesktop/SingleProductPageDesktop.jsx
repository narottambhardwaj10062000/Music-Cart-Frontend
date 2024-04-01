import styles from "./SingleProductPageDesktop.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import musicCartLogo from "../../../assets/images/musicCartLogo.png";
import Button from "../../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import { getProductDetail } from "../../../apis/product";
import { AddToCart } from "../../../apis/cart";
import { useProductContextProvider } from "../../../context/ProductContext";
import ViewCart from "../../../components/ViewCart/ViewCart";
import { checkLogin } from "../../../apis/auth";
import { useSnackbar } from "notistack";
import Star from "../../../components/Star/Star";

const SingleProductPageDesktop = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { cartCount, setCartCount, isLoggedIn, setIsLoggedIn } = useProductContextProvider();

  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const handleBuyNow = async () => {
    if (isLoggedIn === false) {
      navigate("/login");
      return;
    }

    navigate(`/checkout/${productId}`);
  };

  const handleAddToCart = async () => {
    if (isLoggedIn === false) {
      enqueueSnackbar("Please login first", { variant: "error" });
      navigate("/login");
    } else {
      const response = await AddToCart(product?._id);
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

  const handlegGetProductDetail = async () => {
    const response = await getProductDetail(productId);

    if (response?.status === 200) {
      setProduct(response?.data?.productDetails);
    } else if (response?.status === 400) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
      navigate("/");
    } else if (response?.status === 404) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
      navigate("/");
    } else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    } else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  useEffect(() => {
    handlegGetProductDetail();
  }, []);

  return (
    <div className={styles.SingleContainer}>
      {/* header component */}
      <Header />

      <div className={styles.container}>
        {/* NavBar  */}
        <div className={styles.navbar}>
          <div className={styles.leftSide}>
            <div className={styles.title}>
              <img src={musicCartLogo} alt="music-cart-logo" />
              <p>Musicart</p>
            </div>

            {/* Home button */}
            <p className={styles.navLink}>Home/product Name</p>
          </div>

          <div
            className={styles.rightSide}
            style={isLoggedIn ? { display: "flex" } : { display: "none" }}
          >
            {/* View Cart */}
            <ViewCart />
          </div>
        </div>

        {/* back to products Button */}
        <Button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1rem",
            width: "13vw",
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontWeight: "500",
            fontSize: "1.3vw",
            backgroundColor: "#2E0052",
            display: "flex",
            aligItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            marginTop: "3rem",
            marginBottom: "2.5rem",
            cursor: "pointer",
          }}
        >
          Back to products
        </Button>

        {/* product description heading => Heading */}
        <p className={styles.productDescription}>{product?.shortDescription}</p>

        {/* main product description container */}
        <div className={styles.productContainer}>
          {/* All product images container */}
          <div className={styles.imagesContainer}>
            {/* Bigger Image */}
            <div className={styles.bigImageContainer}>
              <img
                src={product?.images?.[imageIndex]}
                alt="bigger-Image"
                style={{ width: "100%", height: "100%", borderRadius: "25px" }}
              />
            </div>

            {/* All side images */}
            <div className={styles.threeImagesGrid}>
              {product?.images?.map((currImage, index) => {
                return (
                  <div key={index} className={styles.smallImg}>
                    <img
                      src={currImage}
                      alt="img-1"
                      onClick={() => setImageIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* All info related to product */}
          <div className={styles.fullInfoContainer}>
            <p className={styles.productName}>
              {product?.brand} {product?.model}
            </p>

            {/* rating and reviews */}
            <div className={styles.starsAndRating}>
              <Star stars={product?.rating} reviews={product?.reviewCount} />
            </div>

            <p className={styles.price}>Price - ₹ {product?.price}</p>
            <p className={styles.color_category}>
              {product?.color} | {product?.headphoneType}
            </p>

            {/* here we need to show an unordered list */}

            <div className={styles.aboutContainer}>
              <span>About this item</span>

              <ul>
                {product?.about?.map((currPara, index) => {
                  return <li key={index}>{currPara}</li>;
                })}
              </ul>
            </div>

            <p className={styles.availability}>
              Available - <span>{product?.available}</span>
            </p>

            <p className={styles.brand}>
              Brand -<span> {product?.brand}</span>
            </p>

            {/* Buttons */}
            <Button
              style={{
                backgroundColor: "#FFD600",
                color: "#000000",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "2vw",
                width: "25vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.6rem 0rem",
                borderRadius: "40px",
                marginTop: "2rem",
                cursor: "pointer",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              style={{
                backgroundColor: "#FFB800",
                color: "#000000",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "2vw",
                width: "25vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.6rem 0rem",
                borderRadius: "40px",
                cursor: "pointer",
              }}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SingleProductPageDesktop;
