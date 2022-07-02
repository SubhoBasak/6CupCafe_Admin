import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [flatReport, setFlatReport] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + '/report/flat', {
            method: "GET",
            headers: {Authorization: localStorage.getItem("token")}
        }).then(res => {
            if (res.status === 200) res.json().then(data => setFlatReport(data))
            else if(res.status === 401 || res.status === 405) return navigate("/login")
            else return alert("Something went wrong! Please try again.")
        })
    }, [])

    return (
        <div className="p-3 w-100">
            <Table striped>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Sale</th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}

export default Dashboard