import React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Discounts = () => {
  const [name, setName] = React.useState("");
  const [disc, setDisc] = React.useState(0.0);
  const [mode, setMode] = React.useState("false");
  const [allDisc, setAllDisc] = React.useState([]);

  const navigate = useNavigate();

  const addDiscApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/discount", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, disc, mode }),
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllDisc([
            {
              _id: data.did,
              name,
              disc,
              mode: mode === "false" ? false : true,
            },
            ...allDisc,
          ]);
          setName("");
          setDisc(0.0);
        });
      else if (res.status === 401) return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const delDiscApi = (did) => {
    fetch(process.env.REACT_APP_BASE_URL + "/discount", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ did }),
    }).then((res) => {
      if (res.status === 200)
        setAllDisc(allDisc.filter((data) => data._id !== did));
      else if (res.status === 401) return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/discount", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllDisc(data));
      else if (res.status === 401) return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row className="w-100 p-3">
      <Col lg="8" md="6" sm="12" className="p-2">
        <Table className="p-2 border border-1 rounded" striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Discount</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allDisc.map((data, index) => (
              <tr key={index}>
                <td className="text-primary fw-bold">{data.name}</td>
                <td className="text-secondary fw-bold">{data.disc}</td>
                <td className="text-danger fw-bold">
                  {data.mode ? "%" : "Flat"}
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => delDiscApi(data._id)}
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
        <Form onSubmit={addDiscApi} className="p-2 border border-1 rounded">
          <h1 className="fs-4 text-warning mt-2">Add Discount</h1>
          <hr />
          <div className="mb-3">
            <FormLabel>Discount name</FormLabel>
            <FormControl
              type="text"
              maxLength="100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter discount name"
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Discount</FormLabel>
            <FormControl
              type="number"
              step="0.01"
              value={disc}
              onChange={(e) => setDisc(e.target.value)}
              min="0"
              placeholder="Enter the discount"
              required
            />
          </div>
          <div className="mb-3">
            <FormLabel>Discount mode</FormLabel>
            <FormSelect onChange={(e) => setMode(e.target.value)}>
              <option value="false">Flat</option>
              <option value="true">Percentage</option>
            </FormSelect>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Discounts;
