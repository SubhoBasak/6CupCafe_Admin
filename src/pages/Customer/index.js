import React from "react";
import { Row, Col, Table, Form, FormControl } from "react-bootstrap";

const Customer = () => {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [reward, setReward] = React.useState("");

  return (
    <Row>
      <Col lg="4" md="12" sm="12">
        <Form>
          <div className="mb-3">
            <FormLable>Name</FormLable>
            <FormControl type="text" maxLength="100" required />
          </div>
        </Form>
      </Col>
      <Col lg="8" md="12" sm="12">
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Method</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Col>
    </Row>
  );
};
