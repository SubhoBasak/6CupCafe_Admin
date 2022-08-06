import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

const Appbar = () => {
  return (
    <>
      <div className="nav-title-bar d-flex align-items-center">
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <p className="fs-4 text-light my-0 ms-3 fw-light">
          <strong>Inibila</strong>
        </p>
        <div className="flex-grow-1 d-flex justify-content-end">
          <Button
            variant="outline-light"
            className="me-2"
            onClick={() => {
              if (window.confirm("Do you really want to log out?")) {
                localStorage.removeItem("token");
                window.location.reload();
              }
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Link to="/inventory" className="nav-link">
            Inventory
          </Link>
        </Nav.Item> */}
        <Nav.Item>
          <Link to="/stuffs" className="nav-link">
            Stuffs
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/delivery" className="nav-link">
            Delivery
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/tax" className="nav-link">
            Tax
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/discounts" className="nav-link">
            Discounts
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/token" className="nav-link">
            Token
          </Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Appbar;
