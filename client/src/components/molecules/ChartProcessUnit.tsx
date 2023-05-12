import React from "react";
import { Card, Heading } from "../atoms";
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Legend, Bar, LabelList } from "recharts";
import { capitalize } from "../../helpers/capitalize";

const data = [
  {
    name: "Ketokan",
    unit: 3,
    stall: 5
  },
  {
    name: "Putty",
    unit: 8,
    stall: 6
  },
  {
    name: "Removal",
    unit: 9,
    stall: 11
  },
  {
    name: "Masking",
    unit: 4,
    stall: 7
  },
  {
    name: "Epoxy",
    unit: 6,
    stall: 3
  },
  {
    name: "Spraying",
    unit: 5,
    stall: 5
  },
  {
    name: "Assembling",
    unit: 6,
    stall: 9
  },
  {
    name: "Polishing",
    unit: 8,
    stall: 7
  }
];

const ChartProcessUnit: React.FC = () => {
  return (
    <Card className="grid min-h-[24rem] place-items-center gap-y-8 px-8 py-6">
      <Heading className="text-lg font-semibold">Proces Unit Chart</Heading>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={data} barSize={20}>
          <XAxis dataKey="name" fontSize={10} />
          <Tooltip
            formatter={(value, name) => [value, capitalize(name as string)]}
            wrapperClassName="bg-card-bg-light border-card-bd-light dark:!bg-card-bg-dark dark:!border-card-bd-dark rounded-md outline-none"
          />
          <Legend formatter={value => capitalize(value)} iconSize={12} wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="unit" fill="#8884d8">
            <LabelList position="insideTop" fill="#fff" fontSize={12} />
          </Bar>
          <Bar dataKey="stall" fill="#59c582">
            <LabelList position="insideTop" fill="#fff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartProcessUnit;
