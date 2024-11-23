import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import client from "../../Utils/client"; // Assuming client is configured for API calls
import { notifyError } from "../../Utils/helpers"; // Assuming this shows an error message
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card } from "@mui/material";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ContactWidget = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: ["Resolved", "Received"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4BC0C0", "#FF6384"],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  });
  const [totalContacts, setTotalContacts] = useState(0);

  // Fetch the pending and resolved counts for the chart
  const fetchContactStats = async () => {
    try {
      const response = await client.get("/contacts/pending-resolved"); // API endpoint that gives counts
      const { pending, resolved } = response.data;

      // Update chart data with the received counts
      setChartData({
        labels: ["Resolved", "Pending"],
        datasets: [
          {
            data: [resolved, pending], // Assuming the data includes both pending and resolved counts
            backgroundColor: ["#4BC0C0", "#FF6384"],
            borderColor: ["#FFFFFF", "#FFFFFF"],
            borderWidth: 2,
          },
        ],
      });

      // Calculate the total contacts count
      setTotalContacts(pending + resolved);
    } catch (error) {
      notifyError("Error fetching contacts");
    }
  };

  useEffect(() => {
    fetchContactStats();
  }, []); // Fetch data only once when the component mounts

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
              label += `: ${context.raw}`;
            }
            return label;
          },
        },
      },
    },
  };

  const handleViewMore = () => {
    navigate("/admin/contacts"); // Replace with the route you want to navigate to
  };

  return (
    <Card sx={{ maxWidth: 345, padding: 3, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Contact Statistics
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 240,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Doughnut data={chartData} options={options} />
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="body1" color="textSecondary">
          Total Contacts:
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {totalContacts}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button variant="text" color="primary" onClick={handleViewMore}>
          View More
        </Button>
      </Box>
    </Card>
  );
};

export default function App() {
  return <ContactWidget />;
}
