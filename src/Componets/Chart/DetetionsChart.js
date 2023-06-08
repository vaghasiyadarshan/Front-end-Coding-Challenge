import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DeletionChart = ({ fullName }) => {
  const [codeFrequency, setCodeFrequency] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codeFrequencyResponse = await axios.get(
          `https://api.github.com/repos/${fullName}/stats/code_frequency`
        );
        setCodeFrequency(codeFrequencyResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullName]);

  const formattedCategories =
    codeFrequency &&
    codeFrequency?.map((row) => new Date(row[0] * 1000).toLocaleDateString());
  const formattedAdditions =
    codeFrequency && codeFrequency?.map((row) => row[2]);

  const options = {
    title: {
      text: `Total Weekly Deletions Activity`,
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
        name: "Deletions",
        data: formattedAdditions,
        connectNulls: true,
        color: "red",
      },
    ],
  };

  return (
    <div>
      {codeFrequency && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default DeletionChart;
