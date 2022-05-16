import React from "react";
import {
  Col,
  Button,
  Form,
  FormSelect,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const Product = () => {
  const [allCatg, setAllCatg] = React.useState([]);
  const [prodIngs, setProdIngs] = React.useState([]);
  const [ings, setIngs] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [cid, setCid] = React.useState("");
  const [iid, setIid] = React.useState("");
  const [qnt, setQnt] = React.useState("");

  const navigate = useNavigate();
  const { pid } = useParams();

  const editProductApi = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("pid", pid);
    data.append("name", name);
    data.append("price", price);
    data.append("image", image);
    data.append("cid", cid);

    fetch(process.env.REACT_APP_BASE_URL + "/product", {
      method: "PUT",
      headers: { Authorization: localStorage.getItem("token") },
      body: data,
    }).then((res) => {
      if (res.status === 200 || res.status === 404)
        return navigate("/products");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const addProdIngApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/prodIng", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid, iid, qnt }),
    }).then((res) => {
      if (res.status === 200)
        res
          .json()
          .then((data) =>
            setProdIngs([
              ...prodIngs,
              {
                _id: data.ping,
                ing: { _id: iid, name: data.name, unit: data.unit },
                qnt,
              },
            ])
          );
    });
  };

  const delProdIngApi = (ping) => {
    fetch(process.env.REACT_APP_BASE_URL + "/prodIng", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ping }),
    }).then((res) => {
      if (res.status === 200)
        setProdIngs(prodIngs.filter((data) => data._id !== ping));
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
          setCid(data[0] ? data[0]._id : "");
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(process.env.REACT_APP_BASE_URL + "/ing", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setIid(data[0] ? data[0]._id : "");
          setIngs(data);
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/product/details?" +
        new URLSearchParams({ pid }).toString(),
      {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setName(data.name);
          setPrice(data.price);
          setCid(data.category);
          setProdIngs(data.ings);
        });
      else if (res.status === 404) return navigate("/products");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate, pid]);

  return (
    <Row className="w-100">
      <Col
        lg="6"
        md="6"
        sm="12"
        className="d-flex flex-column align-items-center p-3"
      >
        <img
          className="prod-lg-img"
          src={process.env.REACT_APP_BASE_URL + "/static/" + pid + ".jpg"}
          alt="item"
        />
        <Form
          className="w-100 border border-1 p-2 rounded mt-2"
          onSubmit={editProductApi}
        >
          <p className="w-100 text-center text-warning fs-4">Edit Product</p>
          <hr />
          <div className="mb-3">
            <FormLabel>Product image</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
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
              value={cid}
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
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Col>
      <Col
        lg="6"
        md="6"
        sm="12"
        className="p-2 d-flex flex-column align-items-center"
      >
        <div className="w-100 mt-2 border border-1 p-2 rounded">
          <p className="w-100 text-center text-warning fs-4">Ingredients</p>
          <hr />
          {prodIngs.map((ping, index) => (
            <div className="d-flex p-2" key={index}>
              <Form className="d-flex flex-grow-1">
                <FormControl value={ping.ing.name} readOnly />
                <FormControl className="ms-2" value={ping.qnt} readOnly />
                <FormControl className="ms-2" value={ping.ing.unit} readOnly />
              </Form>
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={() => delProdIngApi(ping._id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Form
          className="w-100 mt-2 border border-1 p-2 rounded"
          onSubmit={addProdIngApi}
        >
          <p className="w-100 text-center text-warning fs-4">Add Ingredients</p>
          <hr />
          <div className="d-flex p-2">
            <FormSelect
              className="me-2"
              defaultValue={ings[0] ? ings[0]._id : ""}
              onChange={(e) => setIid(e.target.value)}
            >
              {ings.map((ing, index) => (
                <option key={index} value={ing._id}>
                  {ing.name} - [{ing.unit}]
                </option>
              ))}
            </FormSelect>
            <FormControl
              type="number"
              step="0.01"
              placeholder="Enter the required quantity for single unit"
              value={qnt}
              min="0"
              onChange={(e) => setQnt(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex flex-column align-items-end">
            <Button
              type="submit"
              variant="success"
              disabled={ings.length <= prodIngs.length}
            >
              Save
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Product;