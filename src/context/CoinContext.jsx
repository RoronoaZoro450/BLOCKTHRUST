import { createContext, useEffect } from "react";
import { useState } from "react";
export const CoinContext=createContext();

const CoinContextProvider=(prop)=>{
    const [allCoin, setAllCoin]=useState([]);
    const [currency, setCurrency]=useState({
        name:"USD",
        symbol:"$"
    });
    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-tAJ2GuQgZZXH4pCfKY2jhB82'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchAllCoin();
    },[currency])
    const contextvalue={
        allCoin,currency,setCurrency

    }

    return(
        <CoinContext.Provider value={ contextvalue}>
            {prop.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;