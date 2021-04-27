import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import React from "react"
import Header from "./components/Header/header-component.jsx"
import UserLoginPage from "./pages/UserLogin/user-login-page.jsx"
import Footer from "./components/Footer/footer-component.jsx"
import {Container} from 'react-bootstrap'
import LawyersPage from './pages/Lawyers/lawyers-page.jsx'
import LawyerPage from './pages/Lawyer/lawyer-page.jsx'
import HomePage from './pages/HomePage/home-page.jsx'
import AppointPage from './pages/AppointPage/appoint-page.jsx'
import UserRegisterPage from "./pages/UserRegister/user-register-page.jsx";
import UserProfilePage from './pages/UserProfile/user-profile-page.jsx'
import LawyerLoginPage from "./pages/LawyerLogin/lawyer-login-page";
import LawyerRegisterPage from "./pages/LawyerRegister/lawyer-register-page";
import UserListPage from "./pages/Users/users-page.jsx";
import LawyerList from "./pages/LawyerList/lawyer-list.jsx";
import LawyerProfilePage from "./pages/LawyerProfile/lawyer-profile-page.jsx"
import CasesPage from "./pages/CasesPage/CasesPage.js"
class App extends React.Component {
  state={message:""}
  render(){

    return (
    <BrowserRouter>
    <Header />
      <main className='py-3'>
        <Container>
         <Route path='/userRegister' component={UserRegisterPage} exact/>
          <Route path='/userLogin' component={UserLoginPage} exact/>
          <Route path='/lawyerLogin' component={LawyerLoginPage} exact/>
          <Route path='/' component={HomePage} exact/>
          <Route path='/lawyers/' component={LawyersPage} exact/>
          <Route path='/lawyers/:id' component={LawyerPage} exact/>
          <Route path='/appoint/:id' component={AppointPage} exact/>
          <Route path='/profile' component={UserProfilePage} exact/>
          <Route path='/lawyerProfile' component={LawyerProfilePage} exact/>
          <Route path='/lawyerRegister' component={LawyerRegisterPage} exact/>
          <Route path='/admin/userList' component={UserListPage} exact/>
          <Route path='/admin/lawyerList' component={LawyerList} exact/>
          <Route path='/cases' component={CasesPage} exact/>
          <Route path='/lawyers/search/:keyword' component={LawyersPage}/>
 
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
      );
  }
 
}

export default App;