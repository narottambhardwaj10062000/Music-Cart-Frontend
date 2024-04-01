import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import musicCartLogo from "../../assets/images/musicCartLogo.png";
import { useForm } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { handleUserRegistration } from "../../apis/auth";
import { useSnackbar } from "notistack";

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await handleUserRegistration({ ...data });
    if (response?.status === 200) {
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      navigate("/");
    }
    else if(response?.status === 409) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: "error" });
    }
    else if(response?.status === 400) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: "error" });
    }
    else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  const isValidMobile = (phoneNumber) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        {/* logo */}
        <div className={styles.titleDesktop}>
          <img src={musicCartLogo} alt="musicIcon" />
          <span>Musicart</span>
        </div>

        {/* mobile Header */}
        <div className={styles.titleMobile}>
          <Header />
        </div>
        <span>Welcome</span>

        {/* signUp form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1>Create Account. <span>Don’t have an account?</span></h1>

          {/* name */}
          <div>
            <span>Your name</span>
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className={styles.error}>*Name is required</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <span>Mobile number</span>
            <input
              type="text"
              {...register("mobile", {
                required: true,
                validate: (value) => isValidMobile(value),
              })}
            />
            {errors.mobile && errors.mobile.type === "required" && (
              <p className={styles.error}>*Mobile number is required</p>
            )}

            {errors.mobile && errors.mobile.type === "validate" && (
              <p className={styles.error}>
                *mobile number must contain 10 digits
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <span>Email id</span>
            <input
              type="text"
              {...register("email", {
                required: true,
                validate: (value) => isValidEmail(value),
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className={styles.error}>*Email is required</p>
            )}

            {errors.email && errors.email.type === "validate" && (
              <p className={styles.error}>*Invalid Email</p>
            )}
          </div>

          {/* Password */}
          <div>
            <span>Password</span>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                // validate: value => isValidPassword(value),
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className={styles.error}>Password is required</p>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <p className={styles.error}>
                Password should be at-least 6 characters
              </p>
            )}

          </div>

          {/* Consent */}
          <span>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </span>

          {/* Continue button */}
          <button type="submit">Continue</button>

          {/* Privacy Policy Text */}
          <span>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </span>
        </form>
        {/* </div> */}

        {/* Login Button */}
        <aside className={styles.bottomPart}>
          <span>Already have an account?</span>
          <a href="/login">Sign In</a>
        </aside>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RegisterPage;

