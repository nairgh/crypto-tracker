import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState("")
  const [currency, setCurrency] = useState([])

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins?currency=USD', {
      headers: {'X-API-KEY': 'SomVLjlNn6PFEGxRfjY4v66UbCy4qkXkOB8wPJfASn0='}
    }).then(res => setCurrency(res.data.result))
    .catch(err => console.log(err))
  }, [])
   console.log("data", currency)
  return (
     <div className="App">
       <div className="header-nav">
        <h2>Crypto Currency Tracker</h2>
      </div>
      <input type="text" placeholder='Search..' onChange={(e)=> setSearch(e.target.value)}></input>
       <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume(24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency.filter((val) =>{
            return val.name.toLowerCase().includes(search.toLowerCase())
          }).map((val)=>{
            return <tr>
            <td className='rank'>{val.rank}</td>
            <td className='logo'>
              <a href={val.websiteUrl}><img src={val.icon} alt=''></img></a>
              <p>{val.name}</p>
            </td>
            <td className='symbol'> {val.symbol}</td>
             <td>${val.marketCap}</td>
             <td>USD {val.price.toFixed(2)}</td>
             <td>{val.availableSupply}</td>
             <td>{val.volume.toFixed(0)}</td>
            </tr>
           }
        )
      }
    
        </tbody>
       </table>
    </div>
  );
}

export default App;
