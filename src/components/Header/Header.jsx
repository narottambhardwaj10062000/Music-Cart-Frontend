import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { BiPhoneCall } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import musicCartLogo from "../../assets/images/musicCartLogo.png";
import { useProductContextProvider } from "../../context/ProductContext";

const Header = ({ page }) => {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useProductContextProvider();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className={styles.headerContainer}>
      {/* contact number */}
      <div className={styles.contact}>
        <BiPhoneCall
          style={{ height: "calc(12px + 0.6vw)", width: "calc(12px + 0.6vw)" }}
        />
        <p>912121131313</p>
      </div>

      {/* middle Div */}
      <div className={styles.middleDiv}>
        <p>Get 50% off on selected items | Shop Now</p>
      </div>

      {/* Login Signup container */}
      <div className={styles.loginSignupContainer}>
        {
          isLoggedIn === false ? 
          <>
            <p onClick={() => navigate("/login")}>Login</p>
            <div className={styles.verticalBar}></div>
            <p onClick={() => navigate("/register")}>Signup</p>
          </>
          :
          <p style={page === "home" ? { display: "none" } : { display: "block" }} onClick={handleLogout}>Logout</p>
        }
      </div>

      <div
        className={styles.mobileHeader}
        onClick={() => {
          redirect("/");
        }}
      >
        <img src={musicCartLogo} alt="musicIcon" />
        <span>Musicart</span>
      </div>
    </div>
  );
};

export default Header;
