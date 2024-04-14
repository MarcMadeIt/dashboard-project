"use client";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, // Add XAxis here
  YAxis,
} from "recharts";
import styles from "./chart.module.css";

const Chart = () => {
  const data = [
    {
      name: "Sun",
      visit: 4000,
      click: 2400,
    },
    {
      name: "Mon",
      visit: 3000,
      click: 1398,
    },
    {
      name: "Tue",
      visit: 2000,
      click: 3800,
    },
    {
      name: "Wed",
      visit: 2780,
      click: 3908,
    },
    {
      name: "Thu",
      visit: 1890,
      click: 4800,
    },
    {
      name: "Fri",
      visit: 2390,
      click: 3800,
    },
    {
      name: "Sat",
      visit: 3490,
      click: 4300,
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ background: "#05141e", border: "#05141e" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="orange"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="click"
            stroke="lime"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
