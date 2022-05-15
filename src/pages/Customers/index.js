import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [allCustomer, setAllCustomers] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/customer/all", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllCustomers(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Container>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Reward</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allCustomer.map((cst, index) => (
            <tr key={index}>
              <td>{cst.name}</td>
              <td>{cst.phone}</td>
              <td>{cst.reward}</td>
              <td>
                <Button variant="outline-success">Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Customers;
