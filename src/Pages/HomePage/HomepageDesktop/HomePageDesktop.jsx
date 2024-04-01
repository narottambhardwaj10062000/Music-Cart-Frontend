import React, { useState, useEffect, useRef } from "react";
import styles from "./HomePageDesktop.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicCartLogo from "../../../assets/images/musicCartLogo.png";
import { IoSearchOutline } from "react-icons/io5";
import bannerImage from "../../../assets/images/bannerImage.png";
import GridCard from "../../../components/GridCard/GridCard";
import ListCard from "../../../components/ListCard/ListCard";
import feedbackIcon from "../../../assets/icons/feedbackIcon.png";
import listFilledIcon from "../../../assets/icons/listFilledIcon.svg";
import listEmptyIcon from "../../../assets/icons/listEmptyIcon.svg";
import gridFilledIcon from "../../../assets/icons/gridFilledIcon.svg";
import gridEmptyIcon from "../../../assets/icons/gridEmptyIcon.svg";
import { getProducts } from "../../../apis/product";
import { getTotalQuantity } from "../../../apis/cart";
import { sendFeedback } from "../../../apis/feedback";
import ViewCart from "../../../components/ViewCart/ViewCart";
import { useNavigate } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { useProductContextProvider } from "../../../context/ProductContext";
import { useSnackbar } from "notistack";

const HomePageDesktop = () => {
  const { cartCount, setCartCount, name, setName, setIsLoggedIn, isLoggedIn } =
    useProductContextProvider();
  const { enqueueSnackbar } = useSnackbar();
  const [filterQuery, setFilterQuery] = useState({});
  const [products, setProducts] = useState(null);

  // finding initials
  const findInitials = (name) => {
    const splittedArray = name.split(" ");

    if (splittedArray.length === 1) {
      return splittedArray[0][0].toUpperCase();
    } else {
      return (
        splittedArray[0][0].toUpperCase() + splittedArray[1][0].toUpperCase()
      );
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    enqueueSnackbar("Logged Out successfully", { variant: "success" });
    navigate("/");
  };

  const handleGetTotalQuantity = async () => {
    const response = await getTotalQuantity();

    if (response?.status === 200) {
      setCartCount(response?.data?.totalQuantity);
    }
  };

  useEffect(() => {
    handleGetTotalQuantity();
  }, []);

  // upper profile dropdown
  const [profileBtnState, setProfileBtnState] = useState(false);
  const selectRef = useRef();
  const optionRef = useRef();
  const menuref = useRef();

  const [view, setView] = useState("grid");
  const navigate = useNavigate();

  // dropdown state (feedback type)
  const [isactive, setIsactive] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const handleSendFeedback = async () => {
    if (!selected || !feedbackText) {
      setError(true);
      return;
    }

    const response = await sendFeedback(selected, feedbackText);

    if (response.status === 200) {
      enqueueSnackbar(response?.data.message, { variant: "success" });
      setSelected("");
      setFeedbackText("");
    } else if (response?.status === 400) {
      enqueueSnackbar(response?.data.message, { variant: "error" });
    } else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    } else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target !== selectRef.current && e.target !== optionRef.current)
      setIsactive(false);
  });

  window.addEventListener("click", (e) => {
    if (e.target !== menuref.current) setProfileBtnState(false);
  });

  // to toggle feedback
  const [feedback, setFeedback] = useState(false);


  const fetchProducts = async () => {
    const response = await getProducts(filterQuery);

    if (response.status === 200) {
      setProducts(response?.data?.data);
    }

  };

  useEffect(() => {
    fetchProducts();
  }, [filterQuery]);

  const handleSort = (e) => {
    if (e.target.value === "featured") {
      setFilterQuery({
        ...filterQuery,
        featured: true,
        sortPrice: "",
        sortName: "",
      });
    } else if (e.target.value === "PriceLowest") {
      setFilterQuery({
        ...filterQuery,
        sortPrice: 1,
        sortName: "",
      });
    } else if (e.target.value === "PriceHighest") {
      setFilterQuery({
        ...filterQuery,
        sortPrice: -1,
        sortName: "",
      });
    } else if (e.target.value === "a-z") {
      setFilterQuery({
        ...filterQuery,
        sortName: 1,
        sortPrice: "",
      });
    } else {
      setFilterQuery({
        ...filterQuery,
        sortName: -1,
        sortPrice: "",
      });
    }
  };

  const handlePriceFilter = (e) => {
    if (e.target.value === "featured") {
      setFilterQuery({
        ...filterQuery,
        featured: true,
        minPrice: 0,
        maxPrice: 20000,
      });
    } else {
      const [minPrice, maxPrice] = e.target.value.split("-").map(Number);
      setFilterQuery({ ...filterQuery, minPrice, maxPrice });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (value === "featured") {
      setFilterQuery({ ...filterQuery, featured: true, [name]: "" });
    } else {
      setFilterQuery({ ...filterQuery, [name]: value });
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* header component */}
      <Header page="home" />

      <div className={styles.container}>
        {/* NavBar */}
        <div className={styles.navbar}>
          {/* navbar leftside */}
          <div className={styles.leftSide}>
            {/* Musicart logo and title*/}
            <div className={styles.title}>
              <img src={musicCartLogo} alt="music-cart-logo" />
              <p>Musicart</p>
            </div>

            {/* Home button */}
            <p className={styles.navLink}>Home</p>

            {/* Invoice button */}
            <p
              style={isLoggedIn ? { display: "flex" } : { display: "none" }}
              className={styles.navLink}
              onClick={() => navigate("/invoices")}
            >
              Invoice
            </p>
          </div>

          {/* navbar rightside */}
          <div
            className={styles.rightSide}
            style={isLoggedIn ? { display: "flex" } : { display: "none" }}
          >
            <ViewCart />

            {/* profile icon  */}
            <div className={styles.profileInfoContainer}>
              <div
                className={styles.profileBtn}
                onClick={() => setProfileBtnState(!profileBtnState)}
                ref={menuref}
              >
                {name ? findInitials(name) : ""}
              </div>

              <div
                className={styles.nameLogout}
                style={
                  profileBtnState ? { display: "flex" } : { display: "none" }
                }
              >

                <div
                  style={{
                    borderBottom: "1px solid #DDDDDD",
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontWeight: "600",
                    fontSize: "18px",
                    wordWrap: "none",
                    paddingBottom: "15px",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    borderTop: "1px solid #DDDDDD",
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontWeight: "600",
                    fontSize: "18px",
                    wordWrap: "none",
                    paddingTop: "10px",
                    // paddingBottom: "10px",
                  }}
                  onClick={handleLogout}
                >
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className={styles.bannerContainer}>
          <p>Grab upto 50% off on Selected headphones</p>
          <img
            src={bannerImage}
            alt="banner-image"
            className={styles.bannerImg}
          />
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchLogoContainer}>
            <IoSearchOutline
              style={{ height: "6vh", width: "6vw", color: "#666666" }}
            />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search by Product Name"
            onChange={handleFilterChange}
          />
        </div>

        {/* Filter sort display container */}
        <div className={styles.filterContainer}>
          {/* List and Grid View Buttons */}
          <div className={styles.display}>
            {/* grid Icon */}
            <img
              src={view === "grid" ? gridFilledIcon : gridEmptyIcon}
              alt="grid-view-icon"
              onClick={() => {
                setView("grid");
              }}
            />
            {/* list Icon */}
            <img
              src={view === "list" ? listFilledIcon : listEmptyIcon}
              alt="list-view-icon"
              onClick={() => {
                setView("list");
              }}
            />
          </div>

          {/* All filters */}
          <div className={styles.all_filters}>
            {/* Headphone Type */}
            <select name="headphoneType" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Headphone type
              </option>
              <option value="featured">Featured</option>
              <option value="In ear">In-ear headphone</option>
              <option value="On ear">On-ear headphone</option>
              <option value="Over ear">Over-ear headphone</option>
            </select>

            {/* company filter */}
            <select name="company" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Company
              </option>
              <option value="featured">Featured</option>
              <option value="jbl">JBL</option>
              <option value="sony">Sony</option>
              <option value="boat">Boat</option>
              <option value="zebronics">zebronics</option>
              <option value="marshall">Marshall</option>
              <option value="ptron">Ptron</option>
            </select>

            {/* Color filter */}
            <select name="colour" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Colour
              </option>
              <option value="featured">Featured</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>

            {/* price filter */}
            <select name="price" onChange={handlePriceFilter}>
              <option value="" disabled selected hidden>
                Price
              </option>
              <option value="featured">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-10000">₹1,000-₹10,000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
          </div>

          {/* Sort dropDown */}
          <div className={styles.sortContainer}>
            <span>Sort by:</span>
            <select name="sort" onChange={handleSort}>
              <option value="featured" selected>
                Featured
              </option>
              <option value="PriceLowest">Price:Lowest</option>
              <option value="PriceHighest">Price:Highest</option>
              <option value="a-z">Name:(A-Z)</option>
              <option value="z-a">Name:(Z-A)</option>
            </select>
          </div>
        </div>

        {/* All products Grid view */}
        <div
          style={view === "grid" ? { display: "grid" } : { display: "none" }}
          className={styles.gridContainer}
        >
          {products === null ? (
            <h1>Loading...</h1>
          ) : products.length === 0 ? (
            <h1>No Products Found</h1>
          ) : (
            products.map((currItem, index) => {
              return <GridCard key={currItem._id} {...currItem} />;
            })
          )}
        </div>

        {/* All Products List View */}

        <div
          style={view === "list" ? { display: "flex" } : { display: "none" }}
          className={styles.listContainer}
        >
          {products === null ? (
            <h1>Loading...</h1>
          ) : products.length === 0 ? (
            <h1>No Products Found</h1>
          ) : (
            products.map((currItem, index) => {
              return <ListCard key={currItem._id} {...currItem} />;
            })
          )}
        </div>
      </div>

      {/* Feedback */}
      <div
        className={styles.feedback}
        style={isLoggedIn ? { display: "flex" } : { display: "none" }}
      >
        {/* Feedback Container */}
        <div
          className={styles.feedbackContainer}
          style={feedback ? { display: "flex" } : { display: "none" }}
        >
          {/* Select Feedback Type */}
          <div className={styles.dropdown}>
            <label>Type of feedback</label>

            <div className={styles.dropdown}>
              <div
                className={styles.dropdownBtn}
                onClick={() => {
                  setIsactive(!isactive);
                }}
              >
                {/* choose the type */}
                <input
                  ref={selectRef}
                  type="text"
                  placeholder="choose the type"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  readOnly
                  style={
                    error == true && selected == ""
                      ? { border: "1px solid #FF0000" }
                      : { border: "none" }
                  }
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setIsactive(!isactive);
                  }}
                >
                  <IoChevronDown
                    style={{ position: "absolute", right: "5%" }}
                  />
                </div>
              </div>

              {isactive && (
                <div className={styles.dropdownContent} ref={optionRef}>
                  <div
                    className={styles.dropdownContentItem}
                    onClick={() => {
                      setIsactive(!isactive);
                      setSelected("bugs");
                    }}
                  >
                    Bugs
                  </div>

                  <div
                    className={styles.dropdownContentItem}
                    onClick={() => {
                      setIsactive(!isactive);
                      setSelected("feedback");
                    }}
                  >
                    Feedback
                  </div>

                  <div
                    className={styles.dropdownContentItem}
                    onClick={() => {
                      setIsactive(!isactive);
                      setSelected("query");
                    }}
                  >
                    Query
                  </div>
                </div>
              )}
            </div>
            {error == true && selected == "" ? (
              <p
                style={{
                  color: "#FF0000",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                *Required field
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Feedback Message */}
          <div className={styles.feedbackTextContainer}>
            <label>Feedback</label>

            <textarea
              style={
                error == true && feedbackText == ""
                  ? { border: "1px solid #FF0000" }
                  : { border: "1px solid #919191" }
              }
              className={styles.textAreaContainer}
              placeholder="Type your feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            {error == true && feedbackText == "" ? (
              <p
                style={{
                  color: "#FF0000",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                *Required field
              </p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.submitBtn} onClick={handleSendFeedback}>
            Submit
          </div>
        </div>

        {/* feedback Icon */}
        <div className={styles.Icon} onClick={() => setFeedback(!feedback)}>
          <img
            src={feedbackIcon}
            alt="feedback-Icon"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default HomePageDesktop;
