import React, { useEffect, useState } from "react";
import styles from "./Mobile.module.css";
import MobileFooterNavbar from "../../../components/MobileFooterNavbar/MobileFooterNavbar";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import backIcon from "../../../assets/icons/backIcon.svg";
import { useNavigate } from "react-router-dom";
import { getCartData } from "../../../apis/cart";
import Button from "../../../components/Button/Button";
import { changeProductQuantity } from "../../../apis/cart";
import { useProductContextProvider } from "../../../context/ProductContext";
import { useSnackbar } from "notistack";

const Mobile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const {cartCount, setCartCount, filterQuery, setFilterQuery, searchVal, setSearchVal} = useProductContextProvider();

  useEffect(() => {
    setSearchVal("");
  }, [])

  useEffect(() => {
    const val = products?.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);

    setTotalCartPrice(val);
  }, [products]);

  const handleGetCartData = async () => {
    const response = await getCartData();
    setProducts(response?.data?.data);
  };

  useEffect(() => {
    handleGetCartData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchVal(value);

    navigate("/");

    if (value === "featured") {
      setFilterQuery({ ...filterQuery, featured: true, [name]: "" });
    } else {
      setFilterQuery({ ...filterQuery, [name]: value });
    }
  };

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

  return (
    <div className={styles.mobileCartContainer}>

      {/* <Header /> */}
      <div className={styles.searchBoxHeader}>
        <div>
          <img src={searchIcon} alt="search-icon" />
          <input type="text" name="search" placeholder="search Musicart" onChange={handleFilterChange} value={searchVal} />
        </div>
      </div>

      <div className={styles.container}>
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

        <div className={styles.mobileCardsContainer}>
            
          {products?.map((item, index) => {
            {
              /* console.log(item.image); */
            }
            /* single product card */
            return (
              <div key={item._id} className={styles.singleCardContainer}>
                <div className={styles.left}>
                  <img
                    src={item?.image}
                    alt="product-image"
                    style={{
                      width: "100%",
                      height: "70%",
                      borderRadius: "3.54px",
                    }}
                  />
                </div>

                <div className={styles.right}>
                  <div className={styles.productInfo}>
                    <p className={styles.title}>
                      {item.brand} {item.model}
                    </p>
                    <p className={styles.price}>₹{item.price}</p>
                    <p className={styles.para}>colour : {item.color}</p>
                    <p className={styles.para}>{item.available}</p>
                    {/* <p className={styles.para}>Quantity : {item.quantity}</p> */}
                    <select
                      name="quantity"
                      value={item?.quantity}
                      style={{ width: "5rem", height: "1.5rem" }}
                      onChange={(event) =>
                        handleChangeProductQuantity(
                          item._id,
                          event?.target?.value
                        )
                      }
                    >
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

                  <div className={styles.itemTotal}>
                    <p className={styles.totalkey}>Total:</p>
                    <p className={styles.totalValue}>₹{item.total}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* cart total */}
        <div className={styles.totalcartValue}>
          <div>
            <p>Total MRP <span style={{display: "inline"}}>₹{totalCartPrice}</span></p>
            <p>Discount on MRP: <span>₹0</span></p>
            <p>convenience Fee: <span>₹45</span></p>
          </div>
          <h4>Total Amount: <span>₹{totalCartPrice + 45}</span></h4>
        </div>

        {/* place order button */}
        <Button
          style={{
            backgroundColor: "#FFD600",
            color: "#000000",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "6vw",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6rem 0rem",
            borderRadius: "8px",
            marginTop: "2vh",
          }}

          onClick={() => navigate("/checkout")}
        >
          PLACE ORDER
        </Button>
      </div>

      {/* Footer */}
      <MobileFooterNavbar prop="cart" />
    </div>
  );
};

export default Mobile;
