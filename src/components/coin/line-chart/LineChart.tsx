/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Don't remove this
import { convertNumber } from "../../../utils/convertNumber";
import { ChartData } from "../../../types/chart-data";

interface LineChartProps {
  chartData: ChartData;
  priceType: string;
  multiAxis?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  chartData,
  priceType,
  multiAxis,
}) => {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        ticks: {
          callback: function (value: string | number) {
            if (typeof value === "number") {
              if (priceType === "total_volumes") {
                return convertNumber(value);
              } else if (priceType === "market_caps") {
                return "$" + convertNumber(value);
              } else {
                return "$" + value.toLocaleString();
              }
            }
            return value; // in case value is a string
          },
        },
      },
      y2: multiAxis
        ? {
            type: "linear" as const,
            display: true,
            position: "right" as const,
            ticks: {
              callback: function (value: string | number) {
                if (typeof value === "number") {
                  if (priceType === "total_volumes") {
                    return convertNumber(value);
                  } else if (priceType === "market_caps") {
                    return "$" + convertNumber(value);
                  } else {
                    return "$" + value.toLocaleString();
                  }
                }
                return value; // in case value is a string
              },
            },
          }
        : undefined, // Set undefined when multiAxis is false
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
