import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Initial data for bookings and order sales
  const data = {
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
        label: "Bookings",
        data: [
          120000, 150000, 180000, 100000, 90000, 200000, 160000, 190000, 220000,
          210000, 180000, 240000,
        ], // Example data (in PHP)
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Order Sales",
        data: [
          200000, 230000, 250000, 220000, 180000, 260000, 240000, 290000,
          310000, 320000, 280000, 340000,
        ], // Example data (in PHP)
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // State for selected date range (using dayjs)
  const [startDate, setStartDate] = useState(dayjs("2024-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2024-12-31"));

  // Filter data based on the selected date range
  const filteredData = (startDate, endDate) => {
    const startMonth = startDate.month(); // get the month (0-indexed)
    const endMonth = endDate.month(); // get the month (0-indexed)

    return {
      labels: data.labels.slice(startMonth, endMonth + 1),
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.slice(startMonth, endMonth + 1),
      })),
    };
  };

  // Chart options with currency formatting
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bookings and Order Sales (January - December)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₱" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="date-filter">
          <label>Start Date: </label>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
            minDate={dayjs("2024-01-01")}
            maxDate={dayjs("2024-12-31")}
          />
          <label>End Date: </label>
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
            minDate={startDate}
            maxDate={dayjs("2024-12-31")}
          />
        </div>
      </LocalizationProvider>
      <Bar data={filteredData(startDate, endDate)} options={options} />
    </div>
  );
};

export default BarChart;
