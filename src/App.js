import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Appbar from "./components/Appbar";

import Customers from "./pages/Customers";
import Delivery from "./pages/Delivery";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import Stuffs from "./pages/Stuffs";

const App = () => {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:pid" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/purchase/:iid" element={<Purchase />} />
        <Route path="/stuffs" element={<Stuffs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
