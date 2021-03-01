// import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Header from "./components/header/header-component.jsx"
// import Home from "./pages/home/home.jsx"
// import Lawyers from "./pages/lawyers/lawyers.jsx";
import Axios from "axios"
import React from "react"
class App extends React.Component {
  state={message:""}
  
   componentDidMount(){
   
    Axios.get("/yoyoy").then((res) => {
      console.log(res.data)
  });
   }	
 
  render(){
    
    return (
      <h1>hi</h1>
    );
  }
 
}

export default App;