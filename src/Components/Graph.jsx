import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const CustomTooltip = () => null;

const Graph = ({ customAmount, regularAmounts }) => {
  const data = [
    { name: "Custom", data: parseInt(customAmount, 10) || 0 },
    { name: "Category 1", data: parseInt(regularAmounts[0], 10) || 0 },
    { name: "Category 2", data: parseInt(regularAmounts[1], 10) || 0 },
    { name: "Category 3", data: parseInt(regularAmounts[2], 10) || 0 },
    { name: "Category 4", data: parseInt(regularAmounts[3], 10) || 0 },
  ];

  return (
    <div>
      <BarChart width={600} height={400} data={data}>
        <XAxis dataKey="name" axisLine={{ stroke: '#ffffff' }}/>
        <YAxis tick={false} label={<CurrencyRupeeIcon />} axisLine={{ stroke: '#ffffff' }}/>
        <Tooltip
          isAnimationActive={false}
          content={<CustomTooltip />}
          cursor={false}
        />
        <Bar dataKey="data" fill="#F0C3F1" barSize={40} />
      </BarChart>
    </div>
  );
};

export default Graph;
