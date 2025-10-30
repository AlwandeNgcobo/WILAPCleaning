import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const DriverEfficiencyChart = ({ data }) => {
  if (!data) return null;

  const labels = data.map(d => d.name);
  const deliveries = data.map(d => d.deliveriesCompleted);
  const times = data.map(d => d.avgDeliveryTime);

  const chartData = {
    labels,
    datasets: [{
      label: "Deliveries Completed",
      data: deliveries,
      backgroundColor: "#10B981"
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            const name = ctx.label;
            const deliveries = ctx.raw;
            const avgTime = times[ctx.dataIndex];
            return `${name}: ${deliveries} deliveries\nAvg Time: ${avgTime} hrs`;
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: value => `${value}`,
        font: { weight: "bold" },
        color: "#333",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Driver",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Deliveries Completed",
          font: { weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Driver Efficiency</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DriverEfficiencyChart;

/*
Code by Maduabuchi, C
Link: https://blog.logrocket.com/using-chart-js-react/
Accessed: 14 October 2025
// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;
 */