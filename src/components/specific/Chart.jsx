import { useState, useEffect } from "react";
import {
  CategoryScale,
  Chart as ChartJs,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary components for Chart.js
ChartJs.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Title
  // Register a custom plugin to draw the background color
  //   {
  //     id: 'background-colour',
  //     beforeDraw: (chart) => {
  //       const ctx = chart.canvas.getContext('2d');
  //       ctx.fillStyle = '#f5f5f5'; // Set the background color you want
  //       ctx.fillRect(0, 0, chart.width, chart.height);
  //       ctx.restore();
  //     },
  //   }
);



const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
      },
      title: {
        display: true,
        text: "Population by Nation",
        position: "top",
        align: "start",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      x: {
        display: true, // Hide x-axis labels for widths < 600px
        title: {
          display: true, // Adjust based on screen width
          text: "Nation",
          font: { size: 15, weight: "bold" },
          padding: { top: 20 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        display:true, // Hide y-axis labels for widths < 600px
        title: {
          display: windowWidth > 600, // Adjust based on screen width
          text: "Population",
          font: { size: 15, weight: "bold" },
          padding: { bottom: 20 },
        },
        beginAtZero: false,
        min: windowWidth > 600 ? 250000000 : 300000000,
        max: windowWidth > 600 ? 350000000 : 350000000, 
        grid: { display: false },
        ticks: {
          // Customize tick labels to display "M" for millions
          callback: function(value) {
            return windowWidth <= 600 ? `${value / 1000000}M` : value;
          }
        },
       
      },
    },
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
      const data = await response.json();
      const processedData = data.data.map((item) => {
        // Conditional abbreviation based on screen width
        let nation;
        if (windowWidth < 600) {
          nation = item.Nation === 'United States' ? 'U.S' : item.Nation === 'United Nation' ? 'U.N' : item.Nation;
        } else {
          nation = item.Nation;
        }
        const population = item.Population;
        return { nation, population };
      });
  
      const displayedData = windowWidth < 600 ? processedData.slice(0, 3) : processedData;
      
      setChartData({
        labels: displayedData.map(item => item.nation),
        datasets: [{
          label: "Population",
          data: displayedData.map(item => item.population),
          fill: true,
          backgroundColor: "rgba(107, 33, 168, 0.2)",
          borderColor: "#a855f7",
        }],
      });
    };
  
    fetchData();
  }, [windowWidth]);
  return (
    <div className="bg-[#1c1c1c] p-5 rounded-[20px]  w-[1000px] sm:max-w-[1000px] sm:min-h-[600px]  min-h-[300px] max-sm:w-[280px]">
      <Line data={chartData} options={lineChartOptions} />
    </div>
  );
};

export default LineChart;
