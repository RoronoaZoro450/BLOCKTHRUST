import React, { useEffect } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext,useState} from 'react'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'
function Coin() {
  const {coinId}=useParams();
  const[coinData, setCoinData]=useState(null);
  const[historicalData,setHistoricalData]=useState(null);
  const{currency}=useContext(CoinContext);
  const fetchHistoricalData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-tAJ2GuQgZZXH4pCfKY2jhB82'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }


  const fetchCoinData=async () =>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-tAJ2GuQgZZXH4pCfKY2jhB82'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    .then(res => res.json())
    .then(res => setCoinData(res))
    .catch(err => console.error(err));
}
useEffect(()=>{
fetchCoinData();
fetchHistoricalData();
},[currency])
if(coinData && historicalData){
return (
    <div className='coin'>
        <div className="coin-name">
            <img src={coinData.image?.large} alt="coin" />
            <h1><b>{coinData.name}</b></h1>         
        </div>
        <div className="coinchart">  
        <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>     
          <li><h2>Market Rank</h2></li>
          <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
          <li><h2>Current Price</h2></li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name.toLowerCase()].toLocaleString()}</li>
          <ul>
          <li><h2>Market Cap</h2></li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name.toLowerCase()].toLocaleString()}</li>         </ul>
          </ul>
          <ul>
          <li><h2>24 Hour high</h2></li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name.toLowerCase()].toLocaleString()}</li>
          </ul>
          <ul>
          <li><h2>24 Hour low</h2></li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name.toLowerCase()].toLocaleString()}</li>
          </ul>
       </div>
    </div>
  )
}
else{
    return (
        <div className='spinner'>
          <div className="spin"></div>
        </div>
          )
}
}


export default Coin