import styles from "./OrderSuccessful.module.css";
import React from "react";
import musicCartLogo from "../../assets/images/musicCartLogo.png";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import confetti from "../../assets/images/confetti.png";
import Footer from "../../components/Footer/Footer";
import MobileFooterNavbar from "../../components/MobileFooterNavbar/MobileFooterNavbar";

const OrderSuccessful = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.mobileHeader}>
        <Header />
      </div>
      <div className={styles.desktopHeader}>
        <img src={musicCartLogo} alt="musiCart-logo" />
        <span>Musicart</span>
      </div>
      <main className={styles.container}>
        <div className={styles.confettiBox}>
          <img src={confetti} alt="confetti" />
          <span>Order is placed successfully!</span>
          <span>
            You will be receiving a confirmation email with order details
          </span>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to Home page
          </button>
        </div>
      </main>
      <div className={styles.desktopFooter}>
        <Footer />
      </div>
      <MobileFooterNavbar />
    </>
  );
};

export default OrderSuccessful;
