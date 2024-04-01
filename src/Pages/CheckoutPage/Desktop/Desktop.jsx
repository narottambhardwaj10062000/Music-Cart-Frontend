import styles from "./Desktop.module.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import musicCartLogo from "../../../assets/images/musicCartLogo.png";
import Button from "../../../components/Button/Button";
import Footer from "../../../components/Footer/Footer";
import { getCartData } from "../../../apis/cart";
import { orderPlace } from "../../../apis/order";
import { useProductContextProvider } from "../../../context/ProductContext";
import { IoChevronDown } from "react-icons/io5";
import { buyNow } from "../../../apis/cart";
import { useSnackbar } from "notistack";

const Desktop = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { cartCount, setCartCount, isLoggedIn, setIsLoggedIn } = useProductContextProvider();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isactive, setIsactive] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const selectRef = useRef();
  const optionRef = useRef();
  
  

  window.addEventListener("click", (e) => {
    if (e.target !== selectRef.current && e.target !== optionRef.current)
      setIsactive(false);
  });

  if( !productId ){
    useEffect(() => {
      const val = products.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
      }, 0);
  
      setTotalCartPrice(val);
    }, [products]);
  }

  // handle Buy Now
  const handleBuyNow = async () => {
    const response = await buyNow(productId);
    // setProducts(response?.data?.data);
    
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

    if(productId) {
      handleBuyNow();
    }
    else if(!productId) {
      handleGetCartData();
    }
    
  }, []);


  const handlePlaceOrder = async () => {

    if(!productId){
      const response = await orderPlace(address, paymentMode, null);

      if(response?.status === 200) {
        setCartCount(response?.data?.totalQuantity);
        navigate("/orderSuccessful");
      }
      else if(response?.status === 401) {
        enqueueSnackbar("please login first", { variant: "error" });
        navigate("/login");
      }
      else if(response?.status === 400) {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      }
      else if(response?.status === 404) {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      }
      else if (response?.status === 500) {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      }
      else {
        enqueueSnackbar("Network Error", { variant: "error" });
      }
    }

    if(productId){
      const response = await orderPlace(address, paymentMode, productId);

      if(response?.status === 200){
        navigate("/orderSuccessful");
      }
      else if(response?.status === 401) {
        enqueueSnackbar("please login first", { variant: "error" });
        navigate("/login");
      }
      else{
        enqueueSnackbar("Network Error", { variant: "error" });
      }
    }
  };

  return (
    <div className={styles.checkoutContainer}>
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
            <p className={styles.navLink}>Home/Checkout</p>
          </div>
        </div>

        {/* back to products Button */}
        <Button
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
          onClick={() => navigate("/cart")}
        >
          Back to cart
        </Button>

        {/* checkOut Heading */}
        <div className={styles.myCartTitle}>
          <p>Checkout</p>
        </div>

        {/* checkout Info */}
        <div className={styles.mainContainer}>
          {/* leftside */}
          <div className={styles.infoContainer}>
            {/* Delivery Address */}
            <div
              style={{
                paddingBottom: "1.5rem",
                borderBottom: "2.87px solid #E1E1E1",
              }}
              className={styles.infoContainer_singleSection}
            >
              <p className={styles.infoContainer_singleSection_title}>
                1. Delivery address
              </p>

              <div
                style={{ paddingRight: "1.5rem" }}
                className={styles.deliveryAddress_input}
              >
                <p>{name}</p>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.textArea}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div
              style={{
                borderBottom: "2.87px solid #E1E1E1",
                padding: "1.3rem 0rem",
              }}
              className={styles.infoContainer_singleSection}
            >
              <p className={styles.infoContainer_singleSection_title}>
                2. Payment method
              </p>

              <div style={{ paddingRight: "1.5rem" }}>
                {/* payment mode dropdown */}
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownBtn}
                    onClick={() => {
                      setIsactive(!isactive);
                    }}
                  >
                    {/* choose the type */}
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
              </div>
            </div>

            {/* Review Items */}
            <div
              style={{
                paddingTop: "1rem",
                paddingBottom: "3rem",
                borderBottom: "2.87px solid #E1E1E1",
              }}
              className={styles.infoContainer_singleSection}
            >
              <p className={styles.infoContainer_singleSection_title}>
                3. Review items and delivery
              </p>

              <div
                style={{ paddingRight: "1.5rem" }}
                className={styles.reviewItems_productInfo}
              >
                <div className={styles.reviewItems_productInfo_images}>
                  {/* All product images will appear here */}

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

                <div className={styles.reviewItems_productInfo_info}>
                  <p className={styles.reviewItems_productInfo_info_name}>
                    {products[itemIndex]?.brand} {products[itemIndex]?.model}
                  </p>
                  <p className={styles.reviewItems_productInfo_info_color}>
                    Color : {products[itemIndex]?.color}
                  </p>

                  <div
                    className={
                      styles.reviewItems_productInfo_info_estimatedDelivery
                    }
                  >
                    <p>Estimated delivery</p>
                    <p>Monday - FREE Standard Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Total and place order button */}
            <div className={styles.infoContainer_placeOrder}>
              {/* Place your Order Button */}
              <Button
                style={{
                  backgroundColor: "#FFD600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "1.5vw",
                  padding: "0.5rem 1.2vw",
                  borderRadius: "11px",
                  cursor: "pointer",
                }}
                onClick={handlePlaceOrder}
              >
                Place your Order
              </Button>

              {/* Agree To Terms And Conditions Para */}
              <div
                className={styles.infoContainer_placeOrder_OrderTotalContainer}
              >
                <p className={styles.infoContainer_placeOrder_OrderTotal}>
                  Order Total : ₹{totalCartPrice + 45 + 45}
                </p>

                <p className={styles.infoContainer_placeOrder_AgreeToTerms}>
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </p>
              </div>
            </div>
          </div>

          {/* rightside => Order summary */}
          <div className={styles.orderSummaryContainer}>
            <div className={styles.orderSummary}>
              {/* place your order button */}
              <Button
                style={{
                  backgroundColor: "#FFD600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "1.5vw",
                  padding: "0.5rem 0vw",
                  borderRadius: "11px",
                  cursor: "pointer",
                }}
                onClick={handlePlaceOrder}
              >
                Place your order
              </Button>

              <p className={styles.termsPara}>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>

              <div className={styles.orderSummaryPriceContainer}>
                <p className={styles.orderSummary_title}>Order Summary</p>

                <div className={styles.allPrices}>
                  <div className={styles.orderSummary_price}>
                    <p>Items :</p>
                    <p>₹{totalCartPrice + 45}</p>
                  </div>

                  <div className={styles.orderSummary_price}>
                    <p>Delivery :</p>
                    <p>₹45</p>
                  </div>
                </div>
              </div>

              {/* Order summary Total */}
              <div className={styles.ordersummary_totalPrice}>
                <p>Order Total :</p>
                <p>₹{totalCartPrice + 45 + 45}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Desktop;
