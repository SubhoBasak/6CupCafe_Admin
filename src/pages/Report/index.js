import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [aprData, setAprData] = React.useState(0);
  const [mayData, setMayData] = React.useState(0);
  const [junData, setJunData] = React.useState(0);
  const [julData, setJulData] = React.useState(0);
  const [augData, setAugData] = React.useState(0);
  const [sepData, setSepData] = React.useState(0);
  const [octData, setOctData] = React.useState(0);
  const [novData, setNovData] = React.useState(0);
  const [decData, setDecData] = React.useState(0);
  const [janData, setJanData] = React.useState(0);
  const [febData, setFebData] = React.useState(0);
  const [marData, setMarData] = React.useState(0);

  const navigate = useNavigate();
  const { year, pid } = useParams();

  React.useEffect(() => {
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/report/product?" +
        new URLSearchParams({ pid, year }),
      {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then((res) => {
      if (res.status === 200)
        res.json().then((report) => {
          report.forEach((data) => {
            if (data.year === Number.parseInt(year)) {
              switch (data.month) {
                case 3: {
                  setAprData(data.count);
                  break;
                }
                case 4: {
                  setMayData(data.count);
                  break;
                }
                case 5: {
                  setJunData(data.count);
                  break;
                }
                case 6: {
                  setJulData(data.count);
                  break;
                }
                case 7: {
                  setAugData(data.count);
                  break;
                }
                case 8: {
                  setSepData(data.count);
                  break;
                }
                case 9: {
                  setOctData(data.count);
                  break;
                }
                case 10: {
                  setNovData(data.count);
                  break;
                }
                case 11: {
                  setDecData(data.count);
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              switch (data.month) {
                case 0: {
                  setJanData(data.count);
                  break;
                }
                case 1: {
                  setFebData(data.count);
                  break;
                }
                case 2: {
                  setMarData(data.count);
                  break;
                }
                default: {
                  break;
                }
              }
            }
          });
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate, year, pid]);

  return (
    <div className="w-100 p-3">
      <div className="container">
        <Row className="w-100">
          <Col lg="3" md="12" sm="12">
            <Table striped className="report-table p-3 border border-1 rounded">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>April</td>
                  <td>{aprData}</td>
                </tr>
                <tr>
                  <td>May</td>
                  <td>{mayData}</td>
                </tr>
                <tr>
                  <td>June</td>
                  <td>{junData}</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>{julData}</td>
                </tr>
                <tr>
                  <td>August</td>
                  <td>{augData}</td>
                </tr>
                <tr>
                  <td>Spetember</td>
                  <td>{sepData}</td>
                </tr>
                <tr>
                  <td>October</td>
                  <td>{octData}</td>
                </tr>
                <tr>
                  <td>November</td>
                  <td>{novData}</td>
                </tr>
                <tr>
                  <td>December</td>
                  <td>{decData}</td>
                </tr>
                <tr>
                  <td>January</td>
                  <td>{janData}</td>
                </tr>
                <tr>
                  <td>February</td>
                  <td>{febData}</td>
                </tr>
                <tr>
                  <td>March</td>
                  <td>{marData}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg="9" md="12" sm="12">
            <Bar
              className="mb-5"
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Product Report",
                  },
                },
              }}
              data={{
                labels: [
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                  "January",
                  "February",
                  "March",
                ],
                datasets: [
                  {
                    label: "Sale",
                    data: [
                      aprData,
                      mayData,
                      junData,
                      julData,
                      augData,
                      sepData,
                      octData,
                      novData,
                      decData,
                      janData,
                      febData,
                      marData,
                    ],
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Report;
