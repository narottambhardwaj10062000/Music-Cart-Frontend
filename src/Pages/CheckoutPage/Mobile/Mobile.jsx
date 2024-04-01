import Header from "../../../components/Header/Header";
import styles from "./Mobile.module.css";
import backIcon from "../../../assets/icons/backIcon.svg";
import React, { useState, useRef, useEffect } from "react";
import MobileFooterNavbar from "../../../components/MobileFooterNavbar/MobileFooterNavbar";
import Button from "../../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { getCartData } from "../../../apis/cart";
import { buyNow } from "../../../apis/cart";
import { orderPlace } from "../../../apis/order";
import { useProductContextProvider } from "../../../context/ProductContext";
import { useSnackbar } from "notistack";

const Mobile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [isactive, setIsactive] = useState(false);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const selectRef = useRef();
  const optionRef = useRef();
  const { cartCount, setCartCount } = useProductContextProvider();

  window.addEventListener("click", (e) => {
    if (e.target !== selectRef.current && e.target !== optionRef.current)
      setIsactive(false);
  });

  if (!productId) {
    useEffect(() => {
      const val = products.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
      }, 0);

      setTotalCartPrice(val);
    }, [products]);
  }

  const handleBuyNow = async () => {
    const response = await buyNow(productId);
    
    if (response?.status === 200) {
      const obj = {
        image: response?.data?.data?.images[0],
        brand: response?.data?.data?.brand,
        model: response?.data?.data?.model,
        color: response?.data?.data?.color,
      }
      setProducts([obj]);
      setName(response?.data?.name);
      setTotalCartPrice(response?.data?.data?.price);
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }

  }

  const handleGetCartData = async () => {
    const response = await getCartData();

    if (response?.status === 200) {
      setProducts(response?.data?.data);
      setName(response?.data?.name);
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  useEffect(() => {
    if (productId) {
      handleBuyNow();
    } else if (!productId) {
      handleGetCartData();
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (!productId) {
      const response = await orderPlace(address, paymentMode, null);
      setCartCount(response?.data?.totalQuantity);
      navigate("/orderSuccessful");
    }

    if (productId) {
      const response = await orderPlace(address, paymentMode, productId);
      navigate("/orderSuccessful");
    }

  };

  return (
    <div className={styles.mobileContainer}>
      {/* Header */}
      <Header />

      {/* Back Button */}
      <div className={styles.backButton} onClick={() => navigate("/cart")}>
        <img
          src={backIcon}
          alt="backArrow"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      {/* Title */}
      <h1>Checkout</h1>

      <div className={styles.container}>
        {/* Delivery Address */}
        <div className={styles.deliveryContainer}>
          <h3>1. Delivery address</h3>

          <div className={styles.address}>
            <p style={{ fontSize: "4.8vw" }}>{name}</p>

            <textarea
              className={styles.textArea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* payment method */}
        <div className={styles.paymentMethod}>
          <h3>2. Payment method</h3>

          {/* payment mode dropdown */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownBtn}
              onClick={() => {
                setIsactive(!isactive);
              }}
            >
              <input
                ref={selectRef}
                type="text"
                placeholder="Choose payment method"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                readOnly
              />
              <IoChevronDown />
            </div>
            {isactive && (
              <div className={styles.dropdownContent} ref={optionRef}>
                <div
                  className={styles.dropdownContentItem}
                  onClick={() => {
                    setIsactive(!isactive);
                    setPaymentMode("payOnDelivery");
                  }}
                >
                  Pay on Delivery
                </div>
                <div
                  className={styles.dropdownContentItem}
                  onClick={() => {
                    setIsactive(!isactive);
                    setPaymentMode("upi");
                  }}
                >
                  UPI
                </div>
                <div
                  className={styles.dropdownContentItem}
                  onClick={() => {
                    setIsactive(!isactive);
                    setPaymentMode("card");
                  }}
                >
                  Card
                </div>
              </div>
            )}
          </div>

          {/* ---------------------------------- */}
        </div>

        {/* Review Items and Delivery */}
        <div className={styles.reviewItems}>
          <h3>3. Review items and delivery</h3>

          {/* all images container */}
          <div className={styles.imagesContainer}>
            {products?.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className={
                    styles.reviewItems_productInfo_singleImageContainer
                  }
                  onClick={() => setItemIndex(index)}
                >
                  <img
                    src={item.image}
                    alt="img"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "8.5px",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* info container */}
          <div className={styles.infoContainer}>
            <h6>{products[itemIndex]?.brand} {products[itemIndex]?.model}</h6>
            <p>Color : {products[itemIndex]?.color}</p>
            <p>InStock</p>
            <div>
              <p>Estimated delivery</p>
              <p>Monday - FREE Standard Delivery</p>
            </div>

            {/* order summary */}
            <div className={styles.orderSummary}>
              <h3>Order Summary</h3>
              <div>
                <div className={styles.items}>
                  <p>Items :</p>
                  <p>₹{totalCartPrice + 45}</p>
                </div>

                <div className={styles.delivery}>
                  <p>Delivery :</p>
                  <p>₹45.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.placeOrderContainer}>
          {/* order total */}
          <div className={styles.orderTotal}>
            <h3>Order Total:</h3>
            <h3>₹{totalCartPrice + 45 + 45}</h3>
          </div>

          {/* place order button */}
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
            }}
            onClick={handlePlaceOrder}
          >
            Place your order
          </Button>
        </div>
      </div>

      {/* mobile footer navbar */}
      <MobileFooterNavbar />
    </div>
  );
};

export default Mobile;
