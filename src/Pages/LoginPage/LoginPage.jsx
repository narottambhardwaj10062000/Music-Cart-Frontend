import React from "react";
import styles from "./LoginPage.module.css";
import musicCartLogo from "../../assets/images/musicCartLogo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { handleUserLogin } from "../../apis/auth";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await handleUserLogin({ ...data });

    if (response?.status === 200) {
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      enqueueSnackbar(response?.data.message, { variant: "success" });
      navigate("/");
    }
    else if(response?.status === 404) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: "error" });
    }
    else if(response?.status === 401) {
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

  return (
    <>
      <div className={styles.container}>
        {/* logo */}
        <div className={styles.titleDesktop}>
          <img src={musicCartLogo} alt="musicIcon" />
          <span>Musicart</span>
        </div>

        {/* title mobile */}
        <div className={styles.titleMobile}>
          <Header />
        </div>
        <span>Welcome</span>

        {/* form */}
        {/* <div className={styles.form}> */}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign in. <span style={{ fontSize: "5vw", fontFamily: "Roboto", fontWeight: "200", color: "#000000"}}>Already a customer?</span></h1>

          {/* email Or mobile */}
          <div>
            <span>Enter your email or mobile number</span>
            <input
              type="text"
              {...register("emailOrMobile", {
                required: true,
                validate: value => isValidEmail(value) || isValidMobile(value),
              })}
            />
            {errors.emailOrMobile && errors.emailOrMobile.type === "required" && (
              <p className={styles.error}>*Email is required</p>
            )}

            {errors.emailOrMobile && errors.emailOrMobile.type === "validate" && (
              <p className={styles.error}>*Invalid Email or Mobile number</p>
            )}
          </div>

          {/* password */}
          <div>
            <span>Password</span>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className={styles.error}>*Password is required</p>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <p className={styles.error}>
                Password should be at-least 6 characters
              </p>
            )}

          </div>

          {/* continue button */}
          <button type="submit">Continue</button>

          {/* agree? */}
          <span>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </span>
        </form>
        {/* </div> */}

        {/* Create your musiCart Account */}
        <div className={styles.newToMusic}>
          <div></div>
          <span>New to Musicart?</span>
          <div></div>
        </div>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/register");
          }}
        >
          Create your Musicart account
        </button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
