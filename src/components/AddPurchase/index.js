import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  CloseButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPurchase = (props) => {
  const [qnt, setQnt] = React.useState("");
  const [cost, setCost] = React.useState("");

  const navigate = useNavigate();

  const addPurchaseApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/purchase", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ing: props.iid,
        qnt,
        cost,
      }),
    }).then((res) => {
      if (res.status === 200) {
        props.update(Number.parseInt(qnt));
        return props.close();
      } else if (res.status === 404) return alert("Item not found!");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  return (
    <div className="sub-canvas">
      <Form className="sub-form" onSubmit={addPurchaseApi}>
        <div className="w-100 d-flex justify-content-end">
          <CloseButton onClick={props.close} />
        </div>
        <p className="w-100 text-center text-warning fs-4">Add Purchase</p>
        <hr />
        <div className="mb-3">
          <FormLabel>Quantity [{props.unit}]</FormLabel>
          <FormControl
            type="number"
            step="0.01"
            placeholder="Enter the quantity"
            value={qnt}
            onChange={(e) => setQnt(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <FormLabel>Cost</FormLabel>
          <FormControl
            type="number"
            step="0.01"
            placeholder="Enter the buying cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <Button type="submit">Add</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPurchase;
