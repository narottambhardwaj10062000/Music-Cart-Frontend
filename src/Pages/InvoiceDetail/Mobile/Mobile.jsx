import styles from "./Mobile.module.css";
import Header from "../../../components/Header/Header";
import backIcon from "../../../assets/icons/backIcon.svg";
import MobileFooterNavbar from "../../../components/MobileFooterNavbar/MobileFooterNavbar";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getOrderDetail } from "../../../apis/order";

const Mobile = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [itemIndex, setItemIndex] = useState(0);

  const handleGetOrderDetail = async () => {
    const response = await getOrderDetail(orderId);
    setOrder(response?.data?.data);
    setProducts(response?.data?.data?.products);
  };

  useEffect(() => {
    handleGetOrderDetail();
  }, []);

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
      <h1>Invoices</h1>

      <div className={styles.container}>
        {/* Delivery Address */}
        <div className={styles.deliveryContainer}>
          <h3>1. Delivery address</h3>

          <div className={styles.address}>
            <p style={{ fontSize: "4.8vw" }}>{order?.name}</p>
            <p>{order?.address}</p>
          </div>
        </div>

        {/* payment method */}
        <div className={styles.paymentMethod}>
          <h3>2. Payment method</h3>

          <p>{order.paymentMode}</p>
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
              <p>Delivery:</p>
              <p>Monday - FREE Standard Delivery</p>
            </div>

            {/* order summary */}
            <div className={styles.orderSummary}>
              <h3>Order Summary</h3>
              <div>
                <div className={styles.items}>
                  <p>Items :</p>
                  <p>₹ {order.orderTotal}</p>
                </div>

                <div className={styles.delivery}>
                  <p>Delivery :</p>
                  <p>₹ 45.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.placeOrderContainer}>
          {/* order total */}
          <div className={styles.orderTotal}>
            <h3>Order Total:</h3>
            <h3>₹ {order.orderTotal + 45}</h3>
          </div>
        </div>
      </div>

      {/* mobile footer navbar */}
      <MobileFooterNavbar />
    </div>
  );
};

export default Mobile;
