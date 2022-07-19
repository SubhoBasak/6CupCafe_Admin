import React from "react";
import { Table } from "react-bootstrap";
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
  const [janData, setJanData] = React.useState({ count: 0, amount: 0 });
  const [febData, setFebData] = React.useState({ count: 0, amount: 0 });
  const [marData, setMarData] = React.useState({ count: 0, amount: 0 });
  const [aprData, setAprData] = React.useState({ count: 0, amount: 0 });
  const [mayData, setMayData] = React.useState({ count: 0, amount: 0 });
  const [junData, setJunData] = React.useState({ count: 0, amount: 0 });
  const [julData, setJulData] = React.useState({ count: 0, amount: 0 });
  const [augData, setAugData] = React.useState({ count: 0, amount: 0 });
  const [sepData, setSepData] = React.useState({ count: 0, amount: 0 });
  const [octData, setOctData] = React.useState({ count: 0, amount: 0 });
  const [novData, setNovData] = React.useState({ count: 0, amount: 0 });
  const [decData, setDecData] = React.useState({ count: 0, amount: 0 });

  return (
    <div className="w-100 p-3">
      <div className="container">
        <Table striped className="report-table p-3 border border-1 rounded">
          <thead>
            <tr>
              <th>Month</th>
              <th>Count</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January</td>
              <td>{janData.count}</td>
              <td>{janData.amount}</td>
            </tr>
            <tr>
              <td>February</td>
              <td>{febData.count}</td>
              <td>{febData.amount}</td>
            </tr>
            <tr>
              <td>March</td>
              <td>{marData.count}</td>
              <td>{marData.amount}</td>
            </tr>
            <tr>
              <td>April</td>
              <td>{aprData.count}</td>
              <td>{aprData.amount}</td>
            </tr>
            <tr>
              <td>May</td>
              <td>{mayData.count}</td>
              <td>{mayData.amount}</td>
            </tr>
            <tr>
              <td>June</td>
              <td>{junData.count}</td>
              <td>{junData.amount}</td>
            </tr>
            <tr>
              <td>July</td>
              <td>{julData.count}</td>
              <td>{julData.amount}</td>
            </tr>
            <tr>
              <td>August</td>
              <td>{augData.count}</td>
              <td>{augData.amount}</td>
            </tr>
            <tr>
              <td>Spetember</td>
              <td>{sepData.count}</td>
              <td>{sepData.amount}</td>
            </tr>
            <tr>
              <td>October</td>
              <td>{octData.count}</td>
              <td>{octData.amount}</td>
            </tr>
            <tr>
              <td>November</td>
              <td>{novData.count}</td>
              <td>{novData.amount}</td>
            </tr>
            <tr>
              <td>December</td>
              <td>{decData.count}</td>
              <td>{decData.amount}</td>
            </tr>
          </tbody>
        </Table>
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
                  500, 1000, 700, 653, 234, 834, 434, 923, 742, 632, 874, 432,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
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
                  500, 1000, 700, 653, 234, 834, 434, 923, 742, 632, 874, 432,
                ],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Report;
