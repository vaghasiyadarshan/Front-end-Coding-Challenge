import axios from "axios";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ContributorsChart = ({ fullName }) => {
  const [contributorActivity, setContributorActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${fullName}/stats/contributors`,
          {
            headers: {
              Authorization: "Bearer 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",
            },
          }
        );
        setContributorActivity(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullName]);

  const chartData = contributorActivity
    ? contributorActivity.map((contributor) => ({
        name: contributor.author.login,
        data: contributor.weeks.map((week) => ({
          x: new Date(week.w * 1000),
          y: week.a + week.d,
          additions: week.a,
          deletions: week.d,
          commits: week.c,
        })),
      }))
    : [];

  const options = {
    title: {
      text: "Contributors Activity",
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%Y-%m-%d", this.value);
        },
      },
    },
    yAxis: {
      title: {
        text: "Changes",
      },
    },
    tooltip: {
      backgroundColor: "#ffe6ff", // Background color
      borderRadius: 5, // Border radius
      padding: 10, // Padding
      style: {
        color: "#000000", // Text color
        fontSize: "12px", // Text font size
      },
      pointFormatter: function () {
        const { additions, deletions, commits } = this.options;

        return `
          <br/>
          <h1><b>${this.series.name}</b></h2><br/>     
          Additions: <b>${additions}</b><br/>
          Deletions: <b>${deletions}</b><br/>
          Commits: <b>${commits}</b><br/>
          Total changes: <b>${this.y}</b><br/>
        `;
      },
    },

    series: chartData.map((contributorData) => ({
      name: contributorData.name,
      data: contributorData.data,
    })),
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ContributorsChart;
