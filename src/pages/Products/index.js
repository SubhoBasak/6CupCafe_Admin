import React from "react";
import {
  Col,
  Row,
  Form,
  FormLabel,
  FormControl,
  Button,
  FormSelect,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Category from "../../components/Category";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const [allCatg, setAllCatg] = React.useState([]);
  const [allProds, setAllProds] = React.useState([]);
  const [curCat, setCurCat] = React.useState("");
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [cid, setCid] = React.useState("");
  const [catgWin, setCatgWin] = React.useState(false);

  const navigate = useNavigate();

  const newProductApi = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("name", name);
    data.append("price", price);
    data.append("cid", cid);

    fetch(process.env.REACT_APP_BASE_URL + "/product", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: data,
    }).then((res) => {
      if (res.status === 200)
        res
          .json()
          .then((data) =>
            setAllProds([
              { _id: data.pid, name, price, category: cid },
              ...allProds,
            ])
          );
      else if (res.status === 404)
        return alert("Category not found! Please refresh and retry.");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/category", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllCatg(data);
          setCurCat(data[0] ? data[0]._id : "");
          setCid(data[0] ? data[0]._id : "");
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(process.env.REACT_APP_BASE_URL + "/product", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllProds(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row className="w-100 p-2">
      <Col lg="6" md="12" sm="12" className="p-2">
        <div className="cat-sel-btns d-flex p-2 border border-1 rounded">
          {allCatg.map((catg, index) => {
            return (
              <Button
                key={index}
                variant={curCat === catg._id ? "primary" : "outline-primary"}
                className="ms-2"
                onClick={() => setCurCat(catg._id)}
              >
                {catg.category}
              </Button>
            );
          })}
        </div>
        <div className="mt-2 d-flex flex-wrap justify-content-center p-2 border border-1 rounded">
          {allProds.map((prod, index) => {
            if (prod.category._id !== curCat) return <div key={index}></div>;
            else
              return (
                <ProductCard
                  key={index}
                  name={prod.name}
                  price={prod.price}
                  pid={prod._id}
                  stock={prod.inStock}
                />
              );
          })}
        </div>
      </Col>
      <Col lg="6" md="12" sm="12" className="p-2">
        <div className="d-flex justify-content-end">
          <Button onClick={() => setCatgWin(true)}>Category</Button>
        </div>
        <Form
          className="border border-1 p-2 rounded mt-2"
          onSubmit={newProductApi}
        >
          <div className="mb-3">
            <FormLabel>Product image</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Product name</FormLabel>
            <FormControl
              maxLength="100"
              placeholder="Enter the product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Price</FormLabel>
            <FormControl
              type="number"
              step="0.01"
              placeholder="Enter the product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Category</FormLabel>
            <FormSelect
              defaultValue={allCatg[0] ? allCatg[0]._id : null}
              onChange={(e) => setCid(e.target.value)}
              required
            >
              {allCatg.map((catg, index) => {
                return (
                  <option key={index} value={catg._id}>
                    {catg.category}
                  </option>
                );
              })}
            </FormSelect>
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Col>
      {catgWin ? <Category close={() => setCatgWin(false)} /> : <></>}
    </Row>
  );
};

export default Products;
