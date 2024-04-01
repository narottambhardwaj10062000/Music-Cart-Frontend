import styles from "./GridCard.module.css";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const GridCard = ({
  _id,
  brand,
  color,
  headphoneType,
  images,
  model,
  price,
  shortDescription,
}) => {

  const navigate = useNavigate();

  return (
    <div className={styles.gridCardContainer} >
      <Card cardType="grid" productId={_id} imageUrl={images?.[0]}/>
      
      <div className={styles.gridCardInfo}>
        <p style={{ fontWeight: "700" }}>{brand} {model}</p>
        <p>Price - ₹{price}</p>
        <p>{color} | {headphoneType}</p>
      </div>
    </div>
  );
};

export default GridCard;
