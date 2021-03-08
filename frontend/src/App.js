import './App.css';
import Home from "./pages/home/home-page.jsx"
import Lawyer from "./pages/lawyer/lawyers-page";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from "axios"
import React from "react"
import Header from "./components/Header/header-component.jsx"
import Login from "./pages/login/login-page.jsx"
import Footer from "./components/Footer/footer-component.jsx"
import {Container} from 'react-bootstrap'
import HomePage from './pages/home/home-page.jsx'
class App extends React.Component {
  state={message:""}
  
//    componentDidMount(){
   
//     Axios.get("/home").then((res) => {
//       console.log(res.data)
//   });
//   Axios.get("/lawyers").then((res) => {
//     console.log(res.data)
// });
//    }	
 
  render(){
    
    return (
    //   <BrowserRouter>
    //   <div className="App">
    //   <Navbar />
    //     <Switch>
    //     <Route path="/lawyers" exact component={Lawyers} />
    //       <Route path="/" exact component={Home} />
    //       <Route path="/login" exact component={Login} />
    //     </Switch>
    //     <Footer />
    //   </div>
    // </BrowserRouter>
    <BrowserRouter>
    <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact/>
          <Route path='/lawyer/:id' component={Lawyer} exact/>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
      );
  }
 
}

export default App;