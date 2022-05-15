import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ProductCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate("/product/" + props.pid)}
    >
      <img
        src={process.env.REACT_APP_BASE_URL + "/static/" + props.pid + ".jpg"}
        alt="product"
      />
      <p>{props.name}</p>
      <p className="fw-bold text-danger">Rs. {props.price}</p>
    </div>
  );
};

export default ProductCard;
