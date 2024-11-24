import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material"; // MUI components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import client from "../../../Utils/client";
import { notifyError } from "../../../Utils/helpers";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch contacts per month from your server
    const fetchData = async () => {
      try {
        const response = await client.get("/contacts/numbersPerMonth");
        const data = response.data;

        // Extract months and counts for the chart
        const months = data.map((item) =>
          new Date(2024, item.month - 1).toLocaleString("en", { month: "long" })
        );
        const counts = data.map((item) => item.count);

        // Prepare chart data
        setChartData({
          labels: months,
          datasets: [
            {
              label: "Contacts Per Month",
              data: counts,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
          ],
        });
      } catch (error) {
        notifyError("Failed to fetch contact data.");
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Monthly Contacts
      </Typography>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: { title: { display: true, text: "Months" } },
              y: {
                title: { display: true, text: "Number of Contacts" },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <Typography>Loading chart data...</Typography>
      )}
    </Box>
  );
};

export default LineChart;
