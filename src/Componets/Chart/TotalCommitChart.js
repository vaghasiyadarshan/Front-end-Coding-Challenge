import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TotalCommitChart = ({ fullName }) => {
  const [commitActivity, setCommitActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitActivityResponse = await axios.get(
          `https://api.github.com/repos/${fullName}/stats/commit_activity`
        );

        setCommitActivity([commitActivityResponse?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullName]);

  const options = {
    title: {
      text: "Total Weekly CommitActivity",
    },
    xAxis: {
      categories: commitActivity[0]?.map((row) =>
        new Date(row.week * 1000).toLocaleDateString()
      ),
    },
    yAxis: {
      title: {
        text: "Commit",
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
        name: "commite",
        data: commitActivity[0]?.map((row) => row.total),
      },
    ],
  };

  return (
    <div>
      {commitActivity && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default TotalCommitChart;
