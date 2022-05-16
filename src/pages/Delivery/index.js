import React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const [allDels, setAllDels] = React.useState([]);
  const [name, setName] = React.useState("");
  const [charge, setCharge] = React.useState(0);

  const navigate = useNavigate();

  const addDelvApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/delivery", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, charge }),
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllDels([{ name, charge, _id: data.did }, ...allDels]);
          setName("");
          setCharge(0.0);
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const delDelvApi = (did) => {
    fetch(process.env.REACT_APP_BASE_URL + "/delivery", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ did }),
    }).then((res) => {
      if (res.status === 200)
        setAllDels(allDels.filter((delv) => delv._id !== did));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/delivery", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllDels(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row className="p-2">
      <Col lg="8" md="6" sm="12" className="p-2">
        <Table className="p-2 border border-1 rounded" striped>
          <thead>
            <tr>
              <th>Delivery partner</th>
              <th>Charge</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDels.map((delv, index) => (
              <tr key={index}>
                <td>{delv.name}</td>
                <td>{delv.charge}</td>
                <td>
                  <Button variant="outline-warning">Edit</Button>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => delDelvApi(delv._id)}
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
        <Form className="p-2 border border-1 rounded" onSubmit={addDelvApi}>
          <p className="fs-4 w-100 text-center text-warning">
            Add Delivery Partner
          </p>
          <hr />
          <div className="mb-3">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              maxLength="100"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Charge</FormLabel>
            <FormControl
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter the charge"
              value={charge}
              onChange={(e) => setCharge(e.target.value)}
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

export default Delivery;
