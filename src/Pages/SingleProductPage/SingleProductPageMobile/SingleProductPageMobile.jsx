import React, { useState, useEffect, useRef } from "react";
import styles from "./SingleProductPageMobile.module.css";
import backIcon from "../../../assets/icons/backIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import prevIcon from "../../../assets/icons/prevIcon.svg";
import nextIcon from "../../../assets/icons/nextIcon.svg";
import { getProductDetail } from "../../../apis/product";
import { AddToCart } from "../../../apis/cart";
import MobileFooterNavbar from "../../../components/MobileFooterNavbar/MobileFooterNavbar";
import { useProductContextProvider } from "../../../context/ProductContext";
import Header from "../../../components/Header/Header";
import { useSnackbar } from "notistack";
import Star from "../../../components/Star/Star";

const SingleProductPageMobile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { cartCount, setCartCount, isLoggedIn, setIsLoggedIn } =
    useProductContextProvider();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [slideCounter, setSlideCounter] = useState(0);

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

  //  Handling Image Slide
  const goToNextImg = () => {
    slideCounter < 2 ? setSlideCounter(slideCounter + 1) : setSlideCounter(0);
  };

  const goToPrevImg = () => {
    slideCounter > 0 ? setSlideCounter(slideCounter - 1) : setSlideCounter(3);
  };

  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (diff > 0) {
      goToNextImg();
    } else if (diff < -0) {
      goToPrevImg();
    }

    startX.current = null;
  };

  return (
    <div className={styles.singleMobileContainer}>
      <Header />

      <div className={styles.container}>
        {/* Back Button */}
        <div className={styles.backButton}>
          <img
            src={backIcon}
            alt="backArrow"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Buy now Button */}
        <Button
          style={{
            marginTop: "2vh",
            backgroundColor: "#FFB800",
            color: "#000000",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "6vw",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6rem 0rem",
            borderRadius: "8px",
          }}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>

        {/* all images */}
        <div className={styles.productImgSlider}>
          <div
            className={styles.productImages}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {product?.images?.map((item, index) => {
              return (
                <img
                  src={item}
                  key={index}
                  alt={`headphoneImg${index}`}
                  style={{
                    left: `${index * 100}%`,
                    transform: `translateX(-${slideCounter * 100}%)`,
                  }}
                />
              );
            })}
          </div>

          <div className={styles.imageNoShow}>
            <img src={prevIcon} alt="previcon" onClick={goToPrevImg} />

            <div
              style={{
                backgroundColor: slideCounter === 0 ? "rgba(46, 0, 82, 1)" : "",
              }}
            ></div>
            <div
              style={{
                backgroundColor: slideCounter === 1 ? "rgba(46, 0, 82, 1)" : "",
              }}
            ></div>
            <div
              style={{
                backgroundColor: slideCounter === 2 ? "rgba(46, 0, 82, 1)" : "",
              }}
            ></div>

            <img src={nextIcon} alt="previcon" onClick={goToNextImg} />
          </div>
        </div>

        {/* ------------------------------- */}
        <div className={styles.fullInfoContainer}>
          <p className={styles.productName}>
            {product?.brand} {product?.model}
          </p>
          
          {/* rating and reviews */}
          <div className={styles.starsAndRating}>
            <Star stars={product?.rating} reviews={product?.reviewCount} />
          </div>
          <p className={styles.shortDescription}>{product?.shortDescription}</p>
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
            Available - <span>{product.available}</span>
          </p>
          <p className={styles.brand}>
            Brand -<span> {product.brand}</span>
          </p>

          {/* Buttons */}
          <Button
            style={{
              backgroundColor: "#FFD600",
              color: "#000000",
              fontFamily: "Roboto",
              fontWeight: "400",
              fontSize: "6vw",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.6rem 0rem",
              borderRadius: "8px",
              marginTop: "2rem",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button
            style={{
              marginTop: "0.2vh",
              backgroundColor: "#FFB800",
              color: "#000000",
              fontFamily: "Roboto",
              fontWeight: "400",
              fontSize: "6vw",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.6rem 0rem",
              borderRadius: "8px",
            }}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* mobile Footer */}
      <MobileFooterNavbar />
    </div>
  );
};

export default SingleProductPageMobile;
