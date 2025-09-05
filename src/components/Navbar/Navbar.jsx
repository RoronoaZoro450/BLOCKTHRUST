import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/Logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
function Navbar() {
  
  const{setCurrency}=useContext(CoinContext);
  const currencyHandler=(e)=>{{
      switch(e.target.value){
        case "usd":
            setCurrency({
                name:"USD",
                symbol:"$"
            })
            break;
        case "eur":
            setCurrency({
                name:"EUR",
                symbol:"€"
            })
            break;
        case "inr":
            setCurrency({
                name:"INR",
                symbol:"₹"
            })
            break;
        default:
            setCurrency({
                name:"USD",
                symbol:"$"
            })
      }
   }
   }
  
  return (
    <div className='navbar'>
    <Link to={`./`}>
    <img  src={logo} alt="nav" className='logo'/>
    </Link>
    <ul className='links'>
      <Link to={`./`}>
      <li>Home</li>
      </Link>
      <li>Features</li>
      <li>Pricing</li>
      <li>Blog</li>
      </ul>
    <div className="nav-right">
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <button>Sign Up <img src={arrow_icon} alt="ar" /></button>
    </div>
    </div>
  )
}


export default Navbar;