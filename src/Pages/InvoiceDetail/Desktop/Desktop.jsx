import Header from "../../../components/Header/Header";
import styles from "./Desktop.module.css";
import musicCartLogo from "../../../assets/images/musicCartLogo.png";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { getOrderDetail } from "../../../apis/order";

const Desktop = () => {
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
    <div className={styles.invoiceContainer}>
      {/* header */}
      <Header />
      <div className={styles.container}>
        {/* navbar */}
        <div className={styles.navbar}>
          <div className={styles.leftSide}>
            <div className={styles.title}>
              <img src={musicCartLogo} alt="music-cart-logo" />
              <p>Musicart</p>
            </div>

            {/* Home button */}
            <p className={styles.navLink}>Home/Invoices</p>
          </div>
        </div>

        {/* back to cart Button */}
        <div className={styles.btnContainer}>
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
        </div>

        {/* Invoice Heading */}
        <div className={styles.invoiceTitle}>
          <p>Invoice</p>
        </div>

        {/* Order Info */}
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

              <div className={styles.nameAddress}>
                <p className={styles.name}>{order?.name}</p>
                <p className={styles.address}>
                  {order?.address}
                </p>
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

              {/* payment option container */}
              <div className={styles.paymentMode}>{order.paymentMode}</div>
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

                {/* selected product info */}
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
                    <p>Delivery : Monday - FREE Standard Delivery</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* rightside => Order summary */}
          <div className={styles.orderSummaryContainer}>
            <div className={styles.orderSummary}>
          
              <div className={styles.orderSummaryPriceContainer}>
                <p className={styles.orderSummary_title}>Order Summary</p>

                <div className={styles.allPrices}>
                  <div className={styles.orderSummary_price}>
                    <p>Items :</p>
                    <p>₹ {order.orderTotal}</p>
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
                <p>₹ {order.orderTotal + 45}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
