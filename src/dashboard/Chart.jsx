import React, { useEffect, useState } from "react";
import { getAdminStatictics } from "../config/AxiosInstance";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = () => {
  const [booksChartOptions, setBooksChartOptions] = useState({});
  const [categoryChartOptions, setCategoryChartOptions] = useState({});
  const [usersChartOptions, setUsersChartOptions] = useState({});

  const getDashboardDetails = async () => {
    const { data } = await getAdminStatictics();
    console.log(data);
    if (data.statusCode !== 200) return;
    setupCharts(data.data);
  };

  const setupCharts = (data) => {
    setBooksChartOptions({
      chart: { type: "pie" },
      title: { text: "Books: Borrowed vs Available" },
      plotOptions: {
        pie: {
          colors: ["#7cb5ec", "#434348"],
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Books",
          colorByPoint: true,
          data: [
            { name: "Borrowed Books", y: data.borrowedBooks },
            { name: "Available Books", y: data.availableBooks },
          ],
        },
      ],
    });

    setCategoryChartOptions({
      chart: { type: "bar" },
      title: { text: "Book Categories" },
      plotOptions: {
        series: {
          color: "#90ed7d",
        },
      },
      xAxis: {
        categories: data.booksByCategory.map((category) => category._id),
        title: { text: null },
      },
      series: [
        {
          name: "Books",
          data: data.booksByCategory.map((category) => category.count),
        },
      ],
    });

    setUsersChartOptions({
      chart: { type: "line" },
      title: { text: "Users Registered by Month" },
      plotOptions: {
        series: {
          color: "#f7a35c",
          marker: {
            enabled: true,
            radius: 4,
          },
        },
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: { text: null },
      },
      series: [
        {
          name: "Users",
          data: data.usersByMonth.map((month) => month.count),
        },
      ],
    });
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <HighchartsReact highcharts={Highcharts} options={booksChartOptions} />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <HighchartsReact
          highcharts={Highcharts}
          options={categoryChartOptions}
        />
      </div>
      <div className="col-span-1 md:col-span-2 bg-white shadow-lg rounded-lg p-6">
        <HighchartsReact highcharts={Highcharts} options={usersChartOptions} />
      </div>
    </div>
  );
};

export default Chart;
