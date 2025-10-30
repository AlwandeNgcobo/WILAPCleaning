import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PeakBookingTimesBarChart = ({ data }) => {
  if (!data) return null;

  const hours = Object.keys(data);
  const weekdays = Object.keys(data[hours[0]]);
  const colors = ["#A5B4FC", "#BBF7D0", "#FDE68A", "#FBCFE8", "#93C5FD"];

  const datasets = weekdays.map((day, i) => ({
    label: day,
    data: hours.map(hour => data[hour]?.[day] ?? 0),
    backgroundColor: colors[i % colors.length],
  }));

  const chartData = {
    labels: hours,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: ctx => {
            const day = ctx.dataset.label;
            const hour = ctx.label;
            const count = ctx.raw;
            return `${day} at ${hour}: ${count} bookings`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Bookings",
          font: { weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Peak Booking Times</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PeakBookingTimesBarChart;

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