import React, { Component } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class DashboardChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        // {
        //   name: "Sale Revenue",
        //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        // },
        // {
        //   name: "Profit",
        //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        // },
        // {
        //   name: "Free Cash Flow",
        //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        // },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={350}
      />
    );
  }
}

export default DashboardChart;
