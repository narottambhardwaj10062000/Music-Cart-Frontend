import styles from "./Invoices.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import musicCartLogo from "../../assets/images/musicCartLogo.png";
import ViewCart from "../../components/ViewCart/ViewCart";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import invoiceLogo from "../../assets/icons/invoiceLogo.svg";
import { getAllOrders } from "../../apis/order";
import Footer from "../../components/Footer/Footer";
import MobileFooterNavbar from "../../components/MobileFooterNavbar/MobileFooterNavbar";
import backIcon from "../../assets/icons/backIcon.svg";
import invoiceSmallLogo from "../../assets/icons/invoiceSmallLogo.svg";

const Invoices = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleGetAllOrders = async () => {
    const response = await getAllOrders();
    setOrders(response?.data?.data);
  };

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return (
    <div className={styles.InvoicesContainer}>
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
            <p className={styles.navLink}>Home/View Cart</p>
          </div>

          <div className={styles.rightSide}>
            {/* View Cart */}
            <ViewCart />
          </div>
        </div>

        {/* back to products Button */}
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
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        {/* title */}
        <h1
          style={{
            fontFamily: "Roboto",
            marginTop: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          My Invoices
        </h1>

        <div className={styles.list}>
          {orders?.map((order, index) => {
            return (
              <div key={order._id} className={styles.listItem}>

                <div className={styles.left}>
                  <div className={styles.logo}>
                    <img src={invoiceLogo} alt="invoice-logo" />
                  </div>

                  <div className={styles.info}>
                    <p className={styles.name}>{order.name}</p>
                    
                    <div>
                      <p className={styles.address}>{order.address}</p>
                    </div>
                  </div>
                </div>

                {/* button */}
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

                  onClick={() => navigate(`/invoiceDetail/${order._id}`)}
                >
                  View Invoice
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.mobileContainer}>
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

        {/* main title  */}
        <div className={styles.mobileTitle}>
          <img src={invoiceSmallLogo} alt="my-invoice-logo" />
          <span>My Invoices</span>
        </div>

        {/* Order List */}
        <div className={styles.orderList}>
          {orders?.map((order) => {
            return (
              <div key={order._id} className={styles.mobileListItem}>
                <div className={styles.mobileLeft}>
                  <img src={invoiceLogo} alt="order-logo" />
                  <div>
                    <p className={styles.mobileName}>{order.name}</p>
                    <p className={styles.mobileAddress}>{order.address}</p>
                  </div>
                </div>

                {/* button  */}
                <Button
                  style={{
                    // padding: "2vh 4vw",
                    height: "4vh",
                    borderRadius: "18px",
                    color: "#FFFFFF",
                    fontSize: "4vw",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    backgroundColor: "#2E0052",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // marginRight: "0.8rem"
                    marginRight: "0.8rem",
                    width: "30%",
                  }}
                  onClick={() => navigate(`/invoiceDetail/${order._id}`)}
                >
                  View Invoice
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* desktop footer */}
      <div className={styles.desktopFooter}>
        <Footer />
      </div>

      {/* mobile footer */}
      <div className={styles.mobileFooter}>
        <MobileFooterNavbar prop="invoice" />
      </div>
    </div>
  );
};

export default Invoices;
