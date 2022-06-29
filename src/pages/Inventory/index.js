import React from "react";
import {
  Row,
  Col,
  Table,
  Form,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddPurchase from "../../components/AddPurchase";

const Inventory = () => {
  const [allItems, setAllItems] = React.useState([]);
  const [name, setName] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [iid, setIid] = React.useState({ iid: "", unit: "" });

  const navigate = useNavigate();

  setInterval(() => window.location.reload(), 10000);

  const addItemApi = (e) => {
    e.preventDefault();

    if (!name) return alert("Please enter the item name");

    fetch(process.env.REACT_APP_BASE_URL + "/ing", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, unit }),
    }).then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) =>
            setAllItems([
              { _id: data.iid, name, curStock: 0, unit },
              ...allItems,
            ])
          );
        setName("");
        setUnit("");
      } else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const deleteItemApi = (iid) => {
    if (!window.confirm("Do you really want to delete the item?")) return;

    fetch(process.env.REACT_APP_BASE_URL + "/ing", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ iid }),
    }).then((res) => {
      if (res.status === 200)
        setAllItems(allItems.filter((item) => item._id !== iid));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/ing", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllItems(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row className="w-100 p-2">
      <Col lg="8" md="7" sm="12">
        <Table variant="striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Estimate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    {item.curStock} {item.unit}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteItemApi(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="ms-2"
                      onClick={() => setIid({ iid: item._id, unit: item.unit })}
                    >
                      Add purcahse
                    </Button>
                    <Button
                      variant="outline-success"
                      className="ms-2"
                      onClick={() => navigate("/purchase/" + item._id)}
                    >
                      View purchase
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
      <Col lg="4" md="5" sm="12" className="p-2">
        <Form className="border border-1 rounded p-2" onSubmit={addItemApi}>
          <p className="fs-4 w-100 text-center text-warning">Add Item</p>
          <hr />
          <div className="mb-3">
            <FormLabel>Item name</FormLabel>
            <FormControl
              maxLength="100"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Item unit</FormLabel>
            <FormControl
              maxLength="50"
              placeholder="Enter item unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Col>
      {iid.iid ? (
        <AddPurchase
          iid={iid.iid}
          unit={iid.unit}
          update={(qnt) => {
            for (let i = 0; i < allItems.length; i++) {
              if (allItems[i]._id === iid.iid) {
                allItems[i].curStock += qnt;
                return setAllItems([...allItems]);
              }
            }
          }}
          close={() => setIid({ iid: "", unit: "" })}
        />
      ) : (
        <></>
      )}
    </Row>
  );
};

export default Inventory;
