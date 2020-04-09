import React from "react";
import Graph from "./graph/graph";
//import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

 
  componentDidMount() {
//     axios.get( 'https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-04-01&symbols=CZK')
//       .then(res => {
          
//       let resultObj = res.data.rates
//       let resultArr = []

//       for (let key in resultObj) {
// 					let obj = {}
// 					obj[key] = Object.values(resultObj[key])[0]
// 					resultArr.push(obj)
//       }
//       this.setState({
//         data: resultArr
// })
//       console.log(resultArr)
//     return resultArr 
// })

  fetch(`https://api.exchangeratesapi.io/history?start_at=2019-09-01&end_at=2020-04-01&symbols=CZK`)
      .then(response => response.json())
      .then(data => {
        this.setState({
         data: Object.keys(data.rates).map(date => {
         return {
            date: new Date(date),
            rate: data.rates[date].CZK
           }; 
        })
      });
    })
    .catch(error => console.log(error));
  }

render() {
    const { data } = this.state;
    return (
       <div>
         <h3 style={{ 
              textAlign: "center",
              marginLeft: "50px"
             }}>
            Rate's change of EUR-CZK from Fall 2019 to Spring 2020
         </h3>
         <Graph data={data} />
       </div>
        );
     }
  }

export default App;
