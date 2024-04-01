import styles from "./HomePageMobile.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MobileFooterNavbar from "../../../components/MobileFooterNavbar/MobileFooterNavbar";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import bannerImage from "../../../assets/images/bannerImage.png";
import { getProducts } from "../../../apis/product";
import MobileCard from "../../../components/MobileCard/MobileCard";
import { useProductContextProvider } from "../../../context/ProductContext";
import { IoChevronDown } from "react-icons/io5";
import feedbackIcon from "../../../assets/icons/feedbackIcon.png";
import {sendFeedback} from "../../../apis/feedback";
import { useSnackbar } from "notistack";

const HomePageMobile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, filterQuery, setFilterQuery, searchVal, setSearchVal } = useProductContextProvider();
  const [products, setProducts] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const selectRef = useRef();
  const optionRef = useRef();
  const [selected, setSelected] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState(false);
  const [isactive, setIsactive] = useState(false);

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
    }
    else if(response?.status === 400) {
      enqueueSnackbar(response?.data.message, { variant: "error" });
    }
    else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
    else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target !== selectRef.current && e.target !== optionRef.current)
      setIsactive(false);
  });

  const fetchProducts = async () => {
    const response = await getProducts(filterQuery);
    if(response.status === 200) {
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
    setSearchVal(value);
    if (value === "featured") {
      setFilterQuery({ ...filterQuery, featured: true, [name]: "" });
    } else {
      setFilterQuery({ ...filterQuery, [name]: value });
    }
  };

  return (
    <div className={styles.mobile_HomePage_Container}>
      {/* Header with search box */}
      <div className={styles.searchBoxHeader}>
        <div>
          <img src={searchIcon} alt="search-icon" />
          <input type="text" name="search" placeholder="search Musicart" onChange={handleFilterChange} value={searchVal} />
        </div>
      </div>

      <div className={styles.container}>
        {/* Banner  */}
        <div className={styles.banner_Container}>
          <div>
            <h1>
              Grab upto 50% off on<br></br> Selected headphones
            </h1>
            <button>Buy Now</button>
          </div>

          <img src={bannerImage} alt="banner-Image" />
        </div>

        {/* Filters */}
        <div className={styles.allFiltersContainer}>
          {/* Sort  */}
          <div className={styles.sortBox}>
            <span>Sort by:</span>
            {/* onChange={handleSort} */}
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

          {/* All filters */}
          <div className={styles.filterSelectBox}>
            {/* headphone type wise filter */}
            <select name="headphoneType" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Headphone type
              </option>
              <option value="featured">Featured</option>
              <option value="In ear">In-ear headphone</option>
              <option value="On ear">On-ear headphone</option>
              <option value="Over ear">Over-ear headphone</option>
            </select>

            {/* Company wise filter */}
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

            {/* colour wise filter */}
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

            {/* Price Filter */}
            <select name="price" onChange={handlePriceFilter}>
              <option value="" disabled selected hidden>
                Price
              </option>
              <option value="fetured">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-10000">₹1,000-₹10,000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
          </div>
        </div>

        <div className={styles.all_products_container}>
          {products === null ? (
            <h1>Loading...</h1>
          ) : products.length === 0 ? (
            <h1>No Products Found</h1>
          ) : (
            products.map((currItem, index) => {
              return <MobileCard key={currItem._id} {...currItem} />;
            })
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
                <IoChevronDown style={{ position:"absolute", right: "5%"}}/>
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

      <MobileFooterNavbar prop="home" />
    </div>
  );
};

export default HomePageMobile;
