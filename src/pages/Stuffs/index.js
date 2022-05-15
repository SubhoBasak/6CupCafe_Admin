import React from "react";
import {
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import EditStuff from "../../components/EditStuff";

const Stuffs = () => {
  const [allStuffs, setAllStuffs] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [edit, setEdit] = React.useState(null);

  const navigate = useNavigate();

  const addStuffApi = (e) => {
    e.preventDefault();

    if (!name || !email || !password)
      return alert("Please fill all the details!");

    fetch(process.env.REACT_APP_BASE_URL + "/user/employee", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, role, password }),
    }).then((res) => {
      if (res.status === 200) {
        setAllStuffs([{ name, email, role }, ...allStuffs]);
        setName("");
        setEmail("");
        setRole("0");
        setPassword("");
      } else if (res.status === 400)
        return alert("Please fill all the details!");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const delStuffApi = (email) => {
    fetch(process.env.REACT_APP_BASE_URL + "/user/employee", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200)
        return setAllStuffs(allStuffs.filter((stuff) => stuff.email !== email));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/user/employee", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllStuffs(data));
    });
  }, [navigate]);

  return (
    <Row className="w-100 px-3">
      <Col lg="8" md="7" sm="12" className="p-2">
        <Table variant="striped" className="border border-1 p-2 rounded">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStuffs.map((stuff, index) => {
              return (
                <tr key={index}>
                  <td>{stuff.name}</td>
                  <td>{stuff.email}</td>
                  <td>
                    {stuff.role === 0
                      ? "Admin"
                      : stuff.role === 1
                      ? "Cashier"
                      : "Cook"}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => delStuffApi(stuff.email)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="ms-2"
                      onClick={() =>
                        setEdit({
                          eid: stuff._id,
                          name: stuff.name,
                          email: stuff.email,
                          role: stuff.role,
                        })
                      }
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
      <Col lg="4" md="5" sm="12" className="p-2">
        <Form className="border border-1 p-2 rounded" onSubmit={addStuffApi}>
          <p className="w-100 text-center text-warning fs-4">Add Stuff</p>
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
              defaultValue={role}
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
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Col>
      {edit ? (
        <EditStuff
          eid={edit.eid}
          name={edit.name}
          email={edit.email}
          role={edit.role}
          close={() => setEdit(null)}
          allStuffs={allStuffs}
          setAllStuffs={setAllStuffs}
        />
      ) : (
        <></>
      )}
    </Row>
  );
};

export default Stuffs;
