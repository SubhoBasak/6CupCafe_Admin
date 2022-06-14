import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
  CloseButton,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditDeliery = (props) => {
  const [name, setName] = React.useState(props.name);
  const [charge, setCharge] = React.useState(props.charge);

  const navigate = useNavigate();

  const editDelvApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/delivery", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ did: props.did, name, charge }),
    }).then((res) => {
      if (res.status === 200) {
        props.update(name, charge);
        props.close();
      } else if (res.status === 404)
        return alert("Please refresh the page and try again.");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  return (
    <div className="sub-canvas">
      <Form className="sub-form" onSubmit={editDelvApi}>
        <div className="w-100 d-flex justify-content-end">
          <CloseButton onClick={props.close} />
        </div>
        <p className="fs-4 w-100 text-center text-warning">
          Edit Delivery Partner
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
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditDeliery;
