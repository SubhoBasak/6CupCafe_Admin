import React from "react";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  Button,
  CloseButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditStaff = (props) => {
  const [name, setName] = React.useState(props.name || "");
  const [email, setEmail] = React.useState(props.email || "");
  const [role, setRole] = React.useState(props.role || "");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const editStaffApi = (e) => {
    e.preventDefault();

    if (!name || !email) return alert("Please fill all the details");

    fetch(process.env.REACT_APP_BASE_URL + "/user/employee", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eid: props.eid, name, email, role, password }),
    }).then((res) => {
      if (res.status === 200) {
        for (let i = 0; i < props.allStaffs.length; i++) {
          if (props.allStaffs[i]._id === props.eid) {
            props.allStaffs[i].name = name;
            props.allStaffs[i].email = email;
            props.allStaffs[i].role = role;
          }
        }
        props.setAllStaffs(props.allStaffs);
        props.close();
      } else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  return (
    <div className="sub-canvas">
      <Form className="sub-form" onSubmit={editStaffApi}>
        <div className="w-100 d-flex justify-content-end">
          <CloseButton onClick={props.close} />
        </div>
        <p className="w-100 text-center text-warning fs-4">Edit Staff</p>
        <hr />
        <div className="mb-3">
          <FormLabel>Name</FormLabel>
          <FormControl
            name="name"
            maxLength="100"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            name="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <FormLabel>Role</FormLabel>
          <FormSelect
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="0">Admin</option>
            <option value="1">Cashier</option>
            <option value="2">Cook</option>
          </FormSelect>
        </div>
        <div className="mb-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            name="password"
            placeholder="Please enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditStaff;
