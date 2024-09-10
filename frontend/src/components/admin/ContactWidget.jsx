import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ContactWidget = ({ data }) => {
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

  useEffect(() => {
    // Simulate data fetching or processing
    if (data) {
      const resolved = data.resolved || 0;
      const received = data.received || 0;
      setChartData({
        labels: ["Resolved", "Received"],
        datasets: [
          {
            data: [resolved, received],
            backgroundColor: ["#4BC0C0", "#FF6384"],
            borderColor: ["#FFFFFF", "#FFFFFF"],
            borderWidth: 2,
          },
        ],
      });
      setTotalContacts(resolved + received);
    }
  }, [data]);

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

  return (
    <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Contact Statistics</h2>
      <div className="w-full h-64 flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">Total Contacts:</p>
        <p className="text-xl font-bold">{totalContacts}</p>
        {/* Total number of contacts */}
      </div>
      <div className="flex items-center mt-6">
        {/* Left side: View More */}
        <div className="text-blue-500 cursor-pointer hover:underline">
          View More
        </div>
      </div>
    </div>
  );
};

// Example usage with dynamic data
const sampleData = {
  resolved: 80,
  received: 120,
};

export default function App() {
  return <ContactWidget data={sampleData} />;
}
