import React from "react";
import { Line } from "react-chartjs-2";

const LoadGraph = ({ loadData, title }) => {
  const data = {
    labels: loadData.map((data, i) => 5 * i + "s"),
    datasets: [
      {
        label: title,
        data: loadData,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#593196",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#593196",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#593196",
        pointHoverBorderColor: "#593196",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };
  return <Line data={data} />;
};

export default LoadGraph;
