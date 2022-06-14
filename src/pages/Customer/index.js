import React from "react";
import {
  Row,
  Col,
  Table,
  FormLabel,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Customer = () => {
  const [orders, setOrders] = React.useState([]);

  const navigate = useNavigate();
  const { cid, name, phone, reward } = useParams();

  function pMethod(pcode) {
    if (pcode === 0) return "Cash";
    else if (pcode === 1) return "Card";
    else return "UPI";
  }

  function oMethod(ocode, delv) {
    if (ocode === 0) return "Express Billing";
    else if (delv && delv.name) return delv.name;
    else return "Delivery";
  }

  React.useEffect(() => {
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/sale/cst_orders?" +
        new URLSearchParams({ cid }).toString(),
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setOrders(data);
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [cid, navigate]);

  return (
    <Row>
      <Col lg="8" md="12" sm="12" className="p-3">
        <Table className="border border-1 rounded" striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order type</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, index) => (
              <tr key={index}>
                <td>
                  <Alert variant="primary" className="m-0 p-1 text-center">
                    {new Date(ord.date).toDateString()}
                  </Alert>
                </td>
                <td className="text-secondary">
                  {oMethod(ord.orderType, ord.delivery)} |{" "}
                  {pMethod(ord.payMethod)}
                </td>
                <td>
                  <Alert variant="danger" className="m-0 p-1 text-center">
                    <strong>Rs. </strong> {ord.total} /-
                  </Alert>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Col lg="4" md="12" sm="12" className="p-2">
        <div className="border border-1 rounded p-2">
          <p className="w-100 text-center text-warning fs-4">
            Customer Details
          </p>
          <hr />
          <div className="mb-3">
            <FormLabel>Name</FormLabel>
            <FormControl value={name} readOnly />
          </div>
          <div className="mb-3">
            <FormLabel>Phone</FormLabel>
            <FormControl value={phone} readOnly />
          </div>
          <div className="mb-3">
            <FormLabel>Reward</FormLabel>
            <FormControl value={reward} readOnly />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Customer;
