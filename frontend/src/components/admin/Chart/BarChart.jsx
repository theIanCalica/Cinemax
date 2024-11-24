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
import { TextField, Box, Typography } from "@mui/material";
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
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Order Sales",
        data: [
          200000, 230000, 250000, 220000, 180000, 260000, 240000, 290000,
          310000, 320000, 280000, 340000,
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // State for selected date range
  const [startDate, setStartDate] = useState(dayjs("2024-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2024-12-31"));

  // Filter data based on the selected date range
  const filteredData = (startDate, endDate) => {
    const startMonth = startDate.month();
    const endMonth = endDate.month();

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
    maintainAspectRatio: false,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Sales and Bookings Report
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Start Date:
            </Typography>
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
              minDate={dayjs("2024-01-01")}
              maxDate={dayjs("2024-12-31")}
            />
          </Box>
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              End Date:
            </Typography>
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
              minDate={startDate}
              maxDate={dayjs("2024-12-31")}
            />
          </Box>
        </Box>
      </LocalizationProvider>
      <Box sx={{ width: "100%", maxWidth: 900, height: "400px" }}>
        <Bar data={filteredData(startDate, endDate)} options={options} />
      </Box>
    </Box>
  );
};

export default BarChart;
