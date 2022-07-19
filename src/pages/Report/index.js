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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [janData, setJanData] = React.useState(0);
  const [febData, setFebData] = React.useState(0);
  const [marData, setMarData] = React.useState(0);
  const [aprData, setAprData] = React.useState(0);
  const [mayData, setMayData] = React.useState(0);
  const [junData, setJunData] = React.useState(0);
  const [julData, setJulData] = React.useState(0);
  const [augData, setAugData] = React.useState(0);
  const [sepData, setSepData] = React.useState(0);
  const [octData, setOctData] = React.useState(0);
  const [novData, setNovData] = React.useState(0);
  const [decData, setDecData] = React.useState(0);

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
                    text: "Chart.js Bar Chart",
                  },
                },
              }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                datasets: [
                  {
                    label: "Sale",
                    data: [
                      500, 1000, 700, 653, 234, 834, 434, 923, 742, 632, 874,
                      432,
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
