import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx"
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { register } from "../../actions/userActions.js";
const UserRegisterPage = ({location,history}) => {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch()
  const userRegister=useSelector(state=>state.userRegister)
  const {loading,error,userInfo}=userRegister

  const redirect=location.search?location.search.split('=')[1]:'/'
  
  useEffect(()=>{
    setErrorMessage(error)
    if(userInfo)
    { console.log(userInfo)
      history.push(redirect)
    }
  },[history,userInfo,redirect,error])

  const submitHandler= (e)=>{
      e.preventDefault()
      if(password!==confirmPassword)
      {
          setMessage('Passwords dont match')
      }

      else
      {
      const userType='user'
      dispatch(register(name,email,password,userType))

      }
  }
  
  return (
    <FormContainer>
      <h1>User Register</h1>
      {message&&<Message variant='danger'>{message}</Message> }
      {errorMessage&&<Message variant='danger'>{errorMessage}</Message>}
      {loading&&<Loader></Loader>}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId="name">
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {setName(e.target.value); setMessage(null);setErrorMessage(null)}}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setMessage(null);setErrorMessage(null)}}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>{setMessage(null); setPassword(e.target.value);setErrorMessage(null)}}
          ></Form.Control>
        
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {setMessage(null);setConfirmPassword(e.target.value);setErrorMessage(null)}}
          ></Form.Control>
        </Form.Group>
        

        <Button type="submit" variant="primary">
           REGISTER!
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link
            to={redirect ? `/userLogin?redirect=${redirect}` : "/userLogin"}>
            {" "}login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default UserRegisterPage;
 