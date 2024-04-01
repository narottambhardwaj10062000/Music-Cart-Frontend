import styles from "./Star.module.css";
import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
// import styled from "styled-components";

const Star = ({ stars, reviews }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      
      return (
        <span key={index}>
          {stars >= index + 1 ? (
            <FaStar className={styles.icon} />
          ) : stars >= number ? (
            <FaStarHalfAlt className={styles.icon} />
          ) : (
            <AiOutlineStar className={styles.icon} />
          )}
        </span>
      );
    });
  
    return (
      <div className={styles.wrapper}>
        <div className={styles.iconStyle}>
          {ratingStar}
          <p>({reviews} customer reviews)</p>
        </div>
      </div>
    );
  };

export default Star