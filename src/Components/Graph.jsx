import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const CustomTooltip = () => null;



const Graph = ({ customAmount, regularAmounts }) => {
    const data = [
        { name: 'Custom', data: parseInt(customAmount, 10) || 0 }, // Use parseInt to ensure it's a number
        { name: 'Category 1', data: parseInt(regularAmounts[0], 10) || 0 },
        { name: 'Category 2', data: parseInt(regularAmounts[1], 10) || 0 },
        { name: 'Category 3', data: parseInt(regularAmounts[2], 10) || 0 },
        { name: 'Category 4', data: parseInt(regularAmounts[3], 10) || 0 },
      ];

  return (
    <div>
      {/* <h2>Bar Graph</h2> */}
      <BarChart width={600} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis tick={false} label={<Label content={<CurrencyRupeeIcon fontSize="large"/>} offset={0} position="insideLeft" style={{ fontSize: '16px', fill: '#ffffff' }}/>}/> 
        <Tooltip isAnimationActive={false} content={<CustomTooltip />} cursor={false} />
        <Bar dataKey="data" fill="#F0C3F1" barSize={40}/>
      </BarChart>
    </div>
  );
};

export default Graph;
