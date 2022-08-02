import React from "react";
import {
  Table,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormSelect,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TODAY = new Date();
const DATE_TO =
  TODAY.getFullYear() +
  "-" +
  (TODAY.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  TODAY.getDate().toString().padStart(2, "0");

TODAY.setMonth(TODAY.getMonth() - 1);
const DATE_FROM =
  TODAY.getFullYear() +
  "-" +
  (TODAY.getMonth() + 1).toString().padStart(2, "0") +
  "-01";

const Dashboard = () => {
  const [allProd, setAllProd] = React.useState([]);
  const [allDlv, setAllDlv] = React.useState([]);
  const [EBAmount, setEBAmount] = React.useState(0.0);
  const [EBCount, setEBCount] = React.useState(0);
  const [dlvAmount, setDlvAmount] = React.useState(0.0);
  const [dlvCount, setDlvCount] = React.useState(0);
  const [cashAmount, setCashAmount] = React.useState(0.0);
  const [cashCount, setCashCount] = React.useState(0);
  const [cardAmount, setCardAmount] = React.useState(0.0);
  const [cardCount, setCardCount] = React.useState(0);
  const [upiAmount, setUpiAmount] = React.useState(0.0);
  const [upiCount, setUpiCount] = React.useState(0);
  const [dateFrom, setDateFrom] = React.useState(DATE_FROM);
  const [dateTo, setDateTo] = React.useState(DATE_TO);
  const [reload, setReload] = React.useState(false);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [prd, setPrd] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/product/names", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllProd(data);
          if (data && data.length > 0) {
            setPrd(data[0]._id);
          }
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/report/flat?" +
        new URLSearchParams({ start: dateFrom, end: dateTo }),
      {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setEBAmount(data.ebTotal);
          setEBCount(data.ebCount);
          setDlvAmount(data.dlvTotal);
          setDlvCount(data.dlvCount);
          setCashAmount(data.cashTotal);
          setCashCount(data.cashCount);
          setCardAmount(data.cardTotal);
          setCardCount(data.cardCount);
          setUpiAmount(data.upiTotal);
          setUpiCount(data.upiCount);
          setAllDlv(data.dlv);
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate, reload]);

  return (
    <>
      <div className="d-flex align-items-center p-3 border border-1 m-3">
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          Start Date
        </FormLabel>
        <FormControl
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          End Date
        </FormLabel>
        <FormControl
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <Button className="ms-2 text-nowrap" onClick={() => setReload(!reload)}>
          Get Report
        </Button>
      </div>
      <Row className="w-100 p-3">
        <Col lg="6" md="12" sm="12">
          <div className="border border-1 p-3 rounded">
            <h4 className="w-100 fs-3 text-center text-warning">
              Payment report
            </h4>
            <hr />
            <Table striped title="Payment methods">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-secondary">Cash</td>
                  <td className="fw-bold text-primary">{cashCount}</td>
                  <td className="fw-bold text-danger">Rs. {cashAmount}/-</td>
                </tr>
                <tr>
                  <td className="fw-bold text-secondary">Card</td>
                  <td className="fw-bold text-primary">{cardCount}</td>
                  <td className="fw-bold text-danger">Rs. {cardAmount}/-</td>
                </tr>
                <tr>
                  <td className="fw-bold text-secondary">UPI</td>
                  <td className="fw-bold text-primary">{upiCount}</td>
                  <td className="fw-bold text-danger">Rs. {upiAmount}/-</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col lg="6" md="12" sm="12">
          <div className="border border-1 p-3 rounded">
            <h4 className="w-100 fs-3 text-center text-warning">
              Order report
            </h4>
            <hr />
            <Table striped title="Payment methods">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-secondary">Express Billing</td>
                  <td className="fw-bold text-primary">{EBCount}</td>
                  <td className="fw-bold text-danger">Rs. {EBAmount}/-</td>
                </tr>
                <tr>
                  <td className="fw-bold text-secondary">Home Delivery</td>
                  <td className="fw-bold text-primary">{dlvCount}</td>
                  <td className="fw-bold text-danger">Rs. {dlvAmount}/-</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col lg="8" md="12" sm="12" className="p-3">
          <div className="border border-1 p-3 rounded">
            <h4 className="w-100 fs-3 text-center text-warning">
              Product report
            </h4>
            <hr />
            <FormLabel>
              <strong>Financial year</strong>
            </FormLabel>
            <div className="d-flex">
              <FormLabel className="ms-2">
                <strong>From</strong>
              </FormLabel>
              <FormControl
                type="number"
                className="ms-2"
                value={year}
                onChange={(e) => setYear(Number.parseInt(e.target.value))}
              />
              <FormLabel className="ms-2">
                <strong>To</strong>
              </FormLabel>
              <FormControl
                type="number"
                className="ms-2"
                value={year + 1}
                readOnly
              />
            </div>
            <FormLabel>
              <strong>Select product</strong>
            </FormLabel>
            <FormSelect
              className="mb-3"
              value={prd}
              onChange={(e) => setPrd(e.target.value)}
            >
              {allProd.map((data, index) => (
                <option key={index} value={data._id}>
                  {data.name} : {data.price}
                </option>
              ))}
            </FormSelect>
            <div className="w-100 d-flex justify-content-center">
              <Button onClick={() => navigate(`/report/${year}/${prd}`)}>
                Get Report
              </Button>
            </div>
          </div>
        </Col>
        <Col lg="4" md="12" sm="12" className="p-3">
          <div className="border border-1 p-3 rounded mt-4">
            <h4 className="w-100 fs-3 text-center text-warning">
              Delivery report
            </h4>
            <hr />
            <Table striped title="Product Sale">
              <thead>
                <tr>
                  <th>Delivery partner</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {allDlv.map((data, index) => (
                  <tr key={index}>
                    <td className="fw-bold text-secondary">{data.name}</td>
                    <td className="fw-bold text-primary">{data.count}</td>
                    <td className="fw-bold text-danger">{data.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
