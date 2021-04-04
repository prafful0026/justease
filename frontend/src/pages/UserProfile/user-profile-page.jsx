import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import {
  getUserDetails,
  updateUserProfile,
} from "../../actions/userActions.js";

const UserProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (!userInfo||userInfo.userType==="lawyer") {
      history.push('/userLogin')
    } else {
      if (!user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords dont match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password,userType:"user" }));
    }
  };

  return (
    <Row style={{ display: "flex",
      justifyContent: "center"}}>
      <Col md={3}>
      {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {/* {errorMessage && <Message variant="danger">{errorMessage}</Message>} */}
        {success && <Message variant="success">DATA UPDATED</Message>}
        {loading && <Loader></Loader>}
        <h2>USER PROFILE</h2>

        <Form  onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage(null);
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              disabled={true}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage(null);
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setMessage(null);
                setPassword(e.target.value);
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setMessage(null);
                setConfirmPassword(e.target.value);
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Button style={{width:"100%"}} type="submit" variant="primary">
            UPDATE
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UserProfilePage;
