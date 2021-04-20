import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx"
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { login } from "../../actions/userActions.js";
const LawyerLoginPage = ({location,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch()
  const lawyerLogin=useSelector(state=>state.userLogin)
  const {loading,error,userInfo}=lawyerLogin
   
  const redirect=location.search?location.search.split('=')[1]:'/'
  
  useEffect(()=>{
    setErrorMessage(error)
    if(userInfo)
    {
      history.push(redirect)
    }
  },[history,userInfo,redirect,error])

  const submitHandler= (e)=>{
      e.preventDefault()
      const userType='lawyer'
      dispatch(login(email,password,userType))
  }
  return (
    <FormContainer>
      <h1>Lawyer Sign In</h1>
      {errorMessage&&<Message variant='danger'>{errorMessage}</Message>}
      {loading&&<Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErrorMessage(null)}}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>{ setPassword(e.target.value); setErrorMessage(null)}}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Login In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New lawyer?{" "}
          <Link
            to={redirect ? `/lawyerRegister?redirect=${redirect}` : "/lawyerRegister"}>
            {" "}Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LawyerLoginPage;
 