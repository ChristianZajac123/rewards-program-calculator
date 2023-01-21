import './App.css';
import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {
  const [name, setName] = useState("JIMMY");
  const [transaction, setTransaction] = useState([]);
  let usableTransaction;

  useEffect(() => {
    axios.get('./db.json')
    .then((response)=> {
      setName(response.data.name);
      setTransaction(response.data.transaction_history);
    });

  }, []);
  let monthArray = []


  for (let key in transaction){
    console.log(transaction[key])
  }

  function calculatePoints(money) {
    let points = 0
    if (money < 100) {
      points = money - 50
      return Math.max(points, 0);
    } else {
      points = 50 + (money-100)*2;
      return points;
    }
  };
  function cumulativePoints(array) {
    let total = 0;
    for (let purchase in array) {
      console.log(purchase);
      total += calculatePoints(array[purchase]);
    }
    return total;
  }

  console.log(transaction)
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {name}
        </div>
        
      </header>
      <ul>
          {(()=> {
            let posts = [];
            let monthlyPoints = [];
            let totalPoints = 0;
            for(let key in transaction) {
              posts.push(<h2>{key}</h2>);
              for(let secondaryKey in transaction[key]) {
                  posts.push(<ul><span key={transaction[key][secondaryKey]}> ${transaction[key][secondaryKey]}.00</span></ul>)
                  monthlyPoints.push(transaction[key][secondaryKey]);
                  console.log(monthlyPoints)
              }
              let monthlyTotal = cumulativePoints(monthlyPoints)
              totalPoints += cumulativePoints(monthlyPoints)
              monthlyPoints = [];
              posts.push(<h3>Monthly Points: {monthlyTotal}</h3>)
          } 
            posts.push(<pre><h1>Total Points: {totalPoints}</h1></pre>)
            return posts;
          })()}

        </ul>
    </div>
  );
}

export default App;
