import styles from "./MobileFooterNavbar.module.css";
import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdAddShoppingCart } from "react-icons/md";
import userLogin from "../../assets/icons/userLogin.svg";
import userLogout from "../../assets/icons/userLogout.svg";
import { useNavigate } from "react-router-dom";
import { useProductContextProvider } from "../../context/ProductContext";
import invoiceFooterLogo from "../../assets/icons/invoiceFooterLogo.svg";

const MobileFooterNavbar = ({ prop }) => {
  const { cartCount, setCartCount, isLoggedIn, setIsLoggedIn } = useProductContextProvider();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(prop);

  const handleCartNavigate = () => {
    if(isLoggedIn === true) {
      navigate("/cart");
    }
    else if(isLoggedIn === false) {
      alert("please login first");
      navigate("/login");
    }
  }

  return (
    <div className={styles.footerNav}>
      {/* Home Icon */}
      <div onClick={() => setSelected("home")}>
        {selected === "home" ? <div className={styles.top}></div> : ""}
        <GrHomeRounded
          className={styles.navIcon}
          onClick={() => {
            navigate("/");
          }}
        />
        <span>Home</span>
      </div>

      {/* Cart Icon */}
      <div className={styles.cart} onClick={() => setSelected("cart")}>
        {selected === "cart" ? <div className={styles.top}></div> : ""}
        <MdAddShoppingCart
          className={styles.navIcon}
          onClick={handleCartNavigate}
        />
        <div className={styles.counterDiv}>{isLoggedIn === true ? cartCount : 0}</div>
        <span>Cart</span>
      </div>

      {/* Invoice Icon */}
      <div onClick={() => setSelected("invoice")} style={isLoggedIn === true ? {display: "flex"} : {display: "none"} }>
        {selected === "invoice" ? <div className={styles.top}></div> : ""}
        <img
          src={invoiceFooterLogo}
          alt="invoice-logo"
          onClick={() => {
            navigate("/invoices");
          }}
          className={styles.navIcon}
        />
        <span>Invoice</span>
      </div>

      {/* Login Or Logout Icon */}
      <div
        onClick={() => {
          if (isLoggedIn === false) {
            navigate("/login");
          }
          if (isLoggedIn === true) {
            localStorage.removeItem("token");
          }
        }}
      >
        <img
          src={isLoggedIn === true ? userLogout : userLogin}
          alt="home-icon"
          onClick={(prev) => {
            setIsLoggedIn(!prev);
          }}
          className={styles.navIcon}
        />
        <span>{isLoggedIn === true ? "Logout" : "Login"}</span>
      </div>
    </div>
  );
};

export default MobileFooterNavbar;
