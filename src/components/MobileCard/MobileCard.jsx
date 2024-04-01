import styles from "./MobileCard.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const MobileCard = ({
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
    <div className={styles.cardContainer}>
      <Card cardType="grid" productId={_id} imageUrl={images?.[0]} />

      <div className={styles.mobileCardInfo}>
        <p style={{ fontSize: "4.5vw", fontWeight: "700" }}>
          {brand} {model}
        </p>
        <p>Price - ₹{price}</p>
        <p>
          {color} | {headphoneType}
        </p>
      </div>
    </div>
  );
};

export default MobileCard;
