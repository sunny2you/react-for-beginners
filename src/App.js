
import {useState} from "react";
import { useEffect } from "react";

function App(){
  const[loading,setLoading]=useState(true);
  const [coins, setCoins]=useState([]);
  const[amount,setAmount]=useState("");
  const[result,setResult]=useState("");
  const[selected,setSelected]=useState(1);
  function onChange (event){
    setAmount(event.target.value);
    setResult(amount);
    console.log(result);
  }
  function handleSelect(e){
    console.log(e.target.value);
    setSelected(e.target.value);

  }
  function Test(){
     return <p>You can buy {result} </p>
  }
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers").then((response)=>{
      response.json().then((json)=>{
      setCoins(json);
      setLoading(false);
      });
    });
  },[])
  return<div>
    <h1>The Coins! {loading ? "" : `(${coins.length})`} </h1>
    {loading?<strong>Loading....</strong>:<select onChange={handleSelect}>
      {coins.map((coin)=> <option value={coin.quotes.USD.price} >
        {coin.name} ({coin.symbol}):{coin.quotes.USD.price}USD</option>)}
    </select>}
    
      <input type="text" onChange={onChange} value={amount}></input>
    
      <p>You can buy {(amount/selected).toFixed(2)}</p>
  </div>;
  
}

export default App;