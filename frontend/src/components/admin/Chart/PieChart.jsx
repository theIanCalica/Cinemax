import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Typography, Button, Link } from "@mui/material";
import client from "../../../Utils/client";
import { notifyError } from "../../../Utils/helpers";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
  const [foods, setFoods] = useState([]);

  // Fetch Top 5 Foods
  const fetchTop5 = async () => {
    try {
      const response = await client.get("/foods/top-5");
      if (response.status === 200) {
        setFoods(response.data);
      }
    } catch (error) {
      notifyError("Error fetching top 5 foods");
    }
  };

  useEffect(() => {
    fetchTop5();
  }, []);

  // Prepare Data for Pie Chart
  const data = {
    labels: foods.map((food) => food.name), // Food names as labels
    datasets: [
      {
        data: foods.map((food) => food.totalQuantity), // Total quantities as data
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Assign colors dynamically
        hoverOffset: 4,
      },
    ],
  };

  // Options for the Pie Chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart resizes properly
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (context.parsed) {
              label += `: ${context.raw} Orders`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: { xs: 2, sm: 3, md: 4 }, // Dynamic padding for different screen sizes
        boxShadow: 2,
        borderRadius: 2,
        width: "90%", // Responsive width
        maxWidth: "600px", // Maximum width for larger screens
        margin: "auto", // Center the component
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Chart Title */}
      <Typography variant="h6" fontWeight="600" mb={2} textAlign="center">
        Top 5 Foods
      </Typography>

      {/* Pie Chart */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px", // Dynamic height to make it responsive
        }}
      >
        <Pie data={data} options={options} />
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 4,
          gap: 2, // Spacing for smaller screens
          flexWrap: "wrap", // Wrap actions on smaller screens
        }}
      >
        {/* View More */}
        <Link underline="hover" color="primary" sx={{ cursor: "pointer" }}>
          View More
        </Link>

        {/* Download Report */}
        <Button
          variant="outlined"
          color="success"
          sx={{
            ":hover": {
              backgroundColor: "success.main",
              color: "white",
            },
          }}
        >
          Download Report
        </Button>
      </Box>
    </Box>
  );
};

export default PieChart;
