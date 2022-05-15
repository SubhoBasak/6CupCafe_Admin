import React from "react";
import { Form, FormControl, Button, CloseButton, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Category = (props) => {
  const [allCatg, setAllCatg] = React.useState([]);
  const [category, setCategory] = React.useState("");

  const navigate = useNavigate();

  const addCategoryApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/category", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    }).then((res) => {
      if (res.status === 200) {
        setAllCatg([{ category }, ...allCatg]);
        setCategory("");
      } else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const delCategoryApi = (cid) => {
    if (!cid) return alert("Please refresh the list first!");

    fetch(process.env.REACT_APP_BASE_URL + "/category", {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid }),
    }).then((res) => {
      if (res.status === 200)
        return setAllCatg(allCatg.filter((catg) => catg._id !== cid));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/category", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllCatg(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <div className="sub-canvas">
      <div className="sub-form">
        <div className="w-100 d-flex justify-content-end">
          <CloseButton onClick={props.close} />
        </div>
        <p className="w-100 text-center text-warning fs-4">Category</p>
        <hr />
        <Form
          className="border border-1 p-2 d-flex rounded"
          onSubmit={addCategoryApi}
        >
          <FormControl
            maxLength="100"
            placeholder="Enter the category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Button className="ms-2" type="submit">
            Add
          </Button>
        </Form>
        <Table variant="striped" className="mt-2 border border-1 p-2 rounded">
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCatg.map((catg, index) => {
              return (
                <tr key={index}>
                  <td>{catg.category}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => delCategoryApi(catg._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Category;
