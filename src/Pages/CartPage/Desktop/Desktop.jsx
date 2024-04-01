import styles from "./Desktop.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { PiBagBold } from "react-icons/pi";
import musicCartLogo from "../../../assets/images/musicCartLogo.png";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import { getCartData } from "../../../apis/cart";
import ViewCart from "../../../components/ViewCart/ViewCart";
import { changeProductQuantity } from "../../../apis/cart";
import { useProductContextProvider } from "../../../context/ProductContext";
import { useSnackbar } from "notistack";

const Desktop = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const {cartCount, setCartCount} = useProductContextProvider();

  const handleChangeProductQuantity = async (cartId, newQuantity) => {
    const response = await changeProductQuantity(cartId, newQuantity);

    if (response?.status === 200) {
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      setProducts(response?.data?.data);
      setCartCount(response?.data?.totalQuantity);
    }
    else if (response?.status === 400) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else if (response?.status === 404) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  }

  useEffect(() => {
    const val = products?.reduce((acc, item) => {
      return (acc +=
        item.price * item.quantity);
    }, 0)

    setTotalCartPrice(val);
  }, [products])

  const handleGetCartData = async () => {
    const response = await getCartData();
    setProducts(response?.data?.data);
  };

  useEffect(() => {
    handleGetCartData();
  }, []);

  return (
    <div className={styles.cartContainer}>
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
            <p className={styles.navLink}>Home/View Cart</p>
          </div>

          <div className={styles.rightSide}>
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

        {/* My Cart Heading */}
        <div className={styles.myCartTitle}>
          <PiBagBold style={{ height: "2.5rem", width: "2.5rem" }} />
          <p>My Cart</p>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.cartItemsContainer}>
            {/* cart items container */}
            <div className={styles.upperDiv}>
              {products?.map((item) => {
                return (
                  <div key={item._id} className={styles.cartItem}>
                    {/* image */}
                    <div className={styles.cartItemImage}>
                      <img
                        src={item.image}
                        alt="cart-item-image"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8.5px",
                        }}
                      />
                    </div>

                    {/* name color stock */}
                    <div className={styles.singleCartField}>
                      <p className={styles.nameboldText}>
                        {item.brand} {item.model}
                      </p>
                      <p className={styles.grayText}>Color : {item.color}</p>
                      <p className={styles.grayText}>{item.available}</p>
                    </div>

                    {/* price */}
                    <div className={styles.singleCartField}>
                      <p className={styles.itemTitle}>Price</p>
                      <p className={styles.fieldValue}>₹{item.price}</p>
                    </div>

                    {/* Quantity Dropdown */}
                    <div className={styles.singleCartField}>
                      <p className={styles.itemTitle}>Quantity</p>

                      <select name="quantity" value={item?.quantity} onChange={(event) => handleChangeProductQuantity(item._id, event?.target?.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div>

                    {/* Total */}
                    <div className={styles.singleCartField}>
                      <p className={styles.itemTitle}>Total</p>
                      <p className={styles.fieldValue}>₹{item.total}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* cart item total */}
            <div className={styles.lowerDiv}>
              <div className={styles.itemTotal}>
                <p>{products?.length} Item</p>
                <p>₹{totalCartPrice}</p>
              </div>
            </div>
          </div>

          <div className={styles.priceDetailContainer}>
            {/* Price Details */}
            <div className={styles.priceDetails}>
              <p
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "700",
                  fontFamily: "Roboto",
                }}
              >
                PRICE DETAILS
              </p>

              <div className={styles.singleField}>
                <p>Total MRP</p>
                <p>₹{totalCartPrice}</p>
              </div>

              <div className={styles.singleField}>
                <p>Discount on MRP</p>
                <p>₹0</p>
              </div>

              <div className={styles.singleField}>
                <p>Convenience Fee</p>
                <p>₹45</p>
              </div>
            </div>

            {/* total Amount and place order button */}
            <div className={styles.placeOrderContainer}>
              {/* total Amount */}
              <div className={styles.singleField}>
                <p style={{ fontSize: "1.5vw", fontWeight: "700" }}>
                  Total Amount
                </p>
                <p style={{ fontSize: "1.5vw", fontWeight: "600" }}>₹{totalCartPrice+45}</p>
              </div>

              {/* place Order Button */}
              <Button
                style={{
                  backgroundColor: "#FFD600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: "600",
                  fontSize: "1.5vw",
                  padding: "0.5rem 0vw",
                  borderRadius: "11px",
                  cursor: "pointer",
                }}

                onClick={() => navigate("/checkout")}
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Desktop;
