import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
  
export const Stock = (props) => {
    const [stockXVals, setStockXVals] = useState([]);
    const [stockYVals, setStockYvals] = useState([]);

    useEffect(()=>{
        getStock();
    }, [props.stockName]);

    const getStock = () => {
        let newStockXVals = [];
        let newStockYVals = [];

        const STOCK_KEY = "VLKOHHJXUL8DAJS9";
        const STOCK_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${props.stockName}&outputsize=compact&apikey=${STOCK_KEY}`;
        fetch(STOCK_CALL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let element in data["Time Series (Daily)"]) {
                newStockXVals.push(element);
                newStockYVals.push(data["Time Series (Daily)"][element]["1. open"]);   
            }
            setStockXVals(newStockXVals);
            setStockYvals(newStockYVals);
        })
        .then(() => {
            //pass through function to grab the price
            props.getPrice(newStockYVals[0]);
        })
        .catch((err) => {
            throw new Error(err)
          });
    };
    //boilerplate for chart
    let data = {
        labels: stockXVals,
        datasets: [
            {
                label: 'Stock Price in $',
                data: stockYVals,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    };

    return (
        <>
         <Line data={data} options={options} />
        </>
    );
};
