import React from 'react'
import { Chart } from "react-google-charts";
import { useState, useEffect } from 'react';

function LineChart({historicalData}) {
  const[data, setData] =useState([['Date', 'Price']])
  useEffect(() => {
    let DataCopy =[['Date', 'Price']];
    if (historicalData?.prices) {
    historicalData.prices.map((item)=>{
      DataCopy.push([new Date(item[0]), item[1]]);
    });   
      setData(DataCopy);
    }
}, [historicalData]);
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        hAxis: {
          title: 'Date',
        },
        vAxis: {
          title: 'Price',
        }
      }}
      legendToggle
    />
  )
}

export default LineChart