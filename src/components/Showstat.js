import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables} from 'chart.js/auto';


export default function ShowStatistic(){

    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);


  useEffect(() => fetchData(), []);

  Chart.register(...registerables);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((responseData) => {
        const updatedData = responseData.content.map((training) => {
          
          const totalSpentTime = training.duration;
          return {
            name: training.activity,
            totalSpentTime,
          };
        });
        setChartData(updatedData);
      })
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    if (chartData.length) {
      const ctx = chartRef.current.getContext('2d');

      const groupedData = chartData.reduce((result, training) => {
        const { name, totalSpentTime } = training;
        if (result[name]) {
          result[name] += totalSpentTime;
        } else {
          result[name] = totalSpentTime;
        }
        return result;
      }, {});

      const labels = Object.keys(groupedData);
      const spentTimes = Object.values(groupedData);

      if (chartInstanceRef.current) {

        chartInstanceRef.current.data.labels = labels;
        chartInstanceRef.current.data.datasets[0].data = spentTimes;
        chartInstanceRef.current.update();
      } else {
        
        chartInstanceRef.current = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels,
            datasets: [
              {
                label: 'Training Spent Time',
                data: spentTimes,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            
        },
        });
      }
    }
  }, [chartData]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div>
    <h1>Statistics</h1>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
      
    }}>
      <div style={{ width: '40vw', height: '100vh', maxWidth: '800px'}}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  </div>
  );
};
    // , 