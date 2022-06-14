import React from "react";
import {
  Col,
  Row,
  Table,
  Button,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Tax = () => {
  const [allTax, setAllTax] = React.useState([]);
  const [name, setName] = React.useState("");
  const [tax, setTax] = React.useState("");

  const navigate = useNavigate();

  const newTax = async (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/tax", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, tax }),
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllTax([{ _id: data.tid, name, tax }, ...allTax]);
          setName("");
          setTax("");
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const delTax = (tid) => {
    fetch(process.env.REACT_APP_BASE_URL + "/tax", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tid }),
    }).then((res) => {
      if (res.status === 200)
        setAllTax(allTax.filter((tax) => tax._id !== tid));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/tax", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllTax(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row>
      <Col lg="8" md="6" sm="12" className="p-3">
        <Table striped className="border border-1 rounded">
          <thead>
            <tr>
              <th>Tax</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTax.map((tax, index) => (
              <tr key={index}>
                <td>{tax.name}</td>
                <td>{tax.tax} %</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => delTax(tax._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Col lg="4" md="6" sm="12" className="p-2">
        <Form className="border border-1 rounded p-2" onSubmit={newTax}>
          <p className="fs-4 w-100 text-center text-warning">
            Add Delivery Partner
          </p>
          <hr />
          <div className="mb-3">
            <FormLabel>Tax Name</FormLabel>
            <FormControl
              type="text"
              maxLength="100"
              placeholder="Enter tax name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Tax Rate</FormLabel>
            <FormControl
              type="number"
              step="0.01"
              placeholder="Enter tax rate"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              required
            />
          </div>
          <div className="w-100 d-flex justify-content-center">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Tax;
