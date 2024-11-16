import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Typography, Button, Link } from "@mui/material";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ["Pizza", "Burger", "Sushi", "Pasta", "Tacos"],
    datasets: [
      {
        data: [150, 120, 90, 80, 70],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
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
        padding: 4,
        boxShadow: 2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      {/* Chart Title */}
      <Typography variant="h6" fontWeight="600" mb={2} textAlign="center">
        Top 5 Foods
      </Typography>

      {/* Pie Chart */}
      <Pie data={data} options={options} />

      {/* Footer Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
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
