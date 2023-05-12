import React from "react";
import { Card, Heading } from "../atoms";
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { capitalize } from "../../helpers/capitalize";

const data = [
  {
    month: "Januari",
    total: 80,
    target: 20
  },
  {
    month: "Februari",
    total: 45,
    target: 25
  },
  {
    month: "Maret",
    total: 120,
    target: 15
  },
  {
    month: "April",
    total: 35,
    target: 45
  },
  {
    month: "Mei",
    total: 75,
    target: 23
  },
  {
    month: "Juni",
    total: 65,
    target: 40
  },
  {
    month: "Juli",
    total: 65,
    target: 30
  },
  {
    month: "Agustus",
    total: 45,
    target: 35
  },
  {
    month: "September",
    total: 75,
    target: 20
  },
  {
    month: "Oktober",
    total: 60,
    target: 40
  },
  {
    month: "November",
    total: 65,
    target: 15
  },
  {
    month: "Desember",
    total: 65,
    target: 20
  }
];

const QuantityUnit: React.FC = () => {
  return (
    <Card className="grid min-h-[24rem] place-items-center gap-y-8 px-8 py-6">
      <Heading className="text-lg font-semibold">Quantity Unit / Month Chart</Heading>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={10} interval={0} />
          <YAxis fontSize={12} />
          <Tooltip
            formatter={(value, name) => [value, capitalize(name as string)]}
            wrapperClassName="bg-card-bg-light border-card-bd-light dark:!bg-card-bg-dark dark:!border-card-bd-dark rounded-md outline-none"
          />
          <Legend formatter={value => capitalize(value)} wrapperStyle={{ fontSize: "12px" }} />
          <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="target" stroke="#59c582" activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default QuantityUnit;
