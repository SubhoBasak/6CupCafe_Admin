import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Purchase = () => {
  const [pHistory, setPhistory] = React.useState([]);

  const navigate = useNavigate();
  const { iid, name } = useParams();

  const delPurchaseApi = (pcid) => {
    if (!window.confirm("Do you really want to remove the record?")) return;

    fetch(process.env.REACT_APP_BASE_URL + "/purchase", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pcid }),
    }).then((res) => {
      if (res.status === 200)
        setPhistory(pHistory.filter((data) => data._id !== pcid));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/purchase?" +
        new URLSearchParams({ iid }).toString(),
      {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then((res) => {
      if (res.status === 200)
        return res.json().then((data) => setPhistory(data));
      else if (res.status === 404) return navigate("/inventory");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Container className="py-4">
      <p className="fs-4 text-warning">{name} purchase history</p>
      <Table variant="striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pHistory.map((data, index) => (
            <tr key={index}>
              <td>{new Date(data.date).toDateString()}</td>
              <td>{data.qnt}</td>
              <td>{data.cost}</td>
              <td>{data.qnt * data.cost}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => delPurchaseApi(data._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Purchase;
