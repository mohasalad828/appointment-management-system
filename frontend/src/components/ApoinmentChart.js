import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchAppointmentData } from '../services/appointmentService';
import '../styles/Chart.css';

const AppointmentChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAppointmentData();
      setChartData({
        labels: ['Pending', 'Cancelled', 'In-Process', 'Completed'],
        datasets: [
          {
            data: [
              data.Pending || 0,
              data.Cancelled || 0,
              data['In-Process'] || 0,
              data.Completed || 0,
            ],
            backgroundColor: ['#f39c12', '#e74c3c', '#3498db', '#2ecc71'],
            hoverOffset: 4,
          },
        ],
      });
    };
    loadData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="chart-container">
      <Pie data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
            },
          },
        },
      }} />
    </div>
  );
};

export default AppointmentChart;
