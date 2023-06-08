import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AdditionDeletionChart = ({ fullName }) => {
  const [codeFrequency, setCodeFrequency] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codeFrequencyResponse = await axios.get(
          `https://api.github.com/repos/${fullName}/stats/code_frequency`,
          {
            headers: {
              Authorization: "Bearer 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",
            },
          }
        );
        setCodeFrequency(codeFrequencyResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullName]);

  const formattedCategories = codeFrequency.map((row) =>
    new Date(row[0] * 1000).toLocaleDateString()
  );
  const formattedAdditions = codeFrequency.map((row) => row[1]);

  const options = {
    title: {
      text: "Total Weekly Additions Activity",
    },
    xAxis: {
      categories: formattedCategories,
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    tooltip: {
      backgroundColor: "#ffe6ff", // Background color
      borderRadius: 5, // Border radius
      padding: 10, // Padding
      style: {
        color: "#000000", // Text color
        fontSize: "12px", // Text font size
        fontWeight: "bold", // Text font weight
      },
    },
    series: [
      {
        name: "Additions",
        data: formattedAdditions,
        connectNulls: true,
        color: "green",
      },
    ],
  };

  return (
    <div>
      {codeFrequency.length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default AdditionDeletionChart;
