import React from "react";
import { Badge } from "react-bootstrap";
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
      {props.stock > 0 ? (
        <Badge pill bg="warning" className="stock-out text-dark">
          Stock: {props.stock}
        </Badge>
      ) : (
        <Badge pill bg="danger" className="stock-out text-light">
          Stock Out
        </Badge>
      )}
      <p className="fw-bold text-danger">Rs. {props.price}</p>
    </div>
  );
};

export default ProductCard;
