import React from "react";
import { Table, Row, Col, FormLabel, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allDelv, setAllDevl] = React.useState({});
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

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/delivery", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          data.map((delv) => {
            allDelv[delv._id] = [delv.name, 0, 0];
            return null;
          });
          setAllDevl({ ...allDelv });
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(process.env.REACT_APP_BASE_URL + "/report/flat", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          let countEb = 0,
            countDlv = 0,
            countCash = 0,
            countCard = 0,
            countUpi = 0,
            cashTotal = 0,
            cardTotal = 0,
            upiTotal = 0;
          for (let i = 0; i < data.length; i++) {
            switch (data[i].payMethod) {
              case 0: {
                countCash++;
                cashTotal += data[i].total;
                break;
              }
              case 1: {
                countCard++;
                cardTotal += data[i].total;
                break;
              }
              default:
                countUpi++;
                upiTotal += data[i].total;
            }

            if (data[i].orderType === 0) {
              countEb++;
              setEBAmount(EBAmount + data[i].total);
            } else {
              countDlv++;
              setDlvAmount(dlvAmount + data[i].total);

              let tmp = allDelv[data[i].delivery];
              allDelv[data[i].delivery] = [
                tmp[0],
                tmp[1] + 1,
                tmp[2] + data[i].total,
              ];
            }
          }
          setAllDevl(allDelv);
          setCashCount(countCash);
          setCardCount(countCard);
          setUpiCount(countUpi);
          setEBCount(countEb);
          setDlvCount(countDlv);
          setCashAmount(cashTotal);
          setCardAmount(cardTotal);
          setUpiAmount(upiTotal);
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <>
      <div className="d-flex align-items-center p-3 border border-1 m-3">
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          Start Date
        </FormLabel>
        <FormControl type="date" />
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          End Date
        </FormLabel>
        <FormControl type="date" />
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
          <div className="border border-1 p-3 rounded"></div>
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
                  <th>Item</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(allDelv).map((delv, index) => (
                  <tr key={index}>
                    <td className="fw-bold text-secondary">{delv[1][0]}</td>
                    <td className="fw-bold text-primary">{delv[1][1]}</td>
                    <td className="fw-bold text-danger">{delv[1][2]}</td>
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
