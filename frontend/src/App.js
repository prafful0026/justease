import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from "axios"
import React from "react"
import Header from "./components/Header/header-component.jsx"
import Login from "./pages/login/login-page.jsx"
import Footer from "./components/Footer/footer-component.jsx"
import {Container} from 'react-bootstrap'
import HomePage from './pages/Home/home-page.jsx'
import Lawyer from './pages/Lawyer/lawyer-page.jsx'
class App extends React.Component {
  state={message:""}
  render(){

    return (
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