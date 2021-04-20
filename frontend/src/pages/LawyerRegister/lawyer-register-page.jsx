import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { register } from "../../actions/userActions.js";

const LawyerRegisterPage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [liscenceID, setLiscenceID] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("choose file");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    setErrorMessage(error);
    if (userInfo) {
      console.log(userInfo);
      history.push(redirect);
    }
  }, [history, userInfo, redirect, error]);

  const submitHandler = (e) => {
    const userType = "lawyer";
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords dont match");
    } else
      dispatch(
        register(
          name,
          email,
          password,
          userType,
          liscenceID,
          category,
          description,
          image
        )
      );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setLabel("UPLOADED SUCCESSFULLY!!!")
      setUploading(false)
    } catch (error) {
      setLabel("TRY AGAIN!!")
      console.error(error)
      setUploading(false)
    }
  }


  return (
    <FormContainer>
      <h1>Lawyer Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setMessage(null);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null);
              setErrorMessage(null);
            }}
          ></Form.Control>

        </Form.Group>
        <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              {/* <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.File
                id='image-file'
                label={label}
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

        <Form.Group controlId='liscenceID'>
          <Form.Label>LiscenceID</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter LiscenceID'
            value={liscenceID}
            onChange={(e) => {
              setLiscenceID(e.target.value);
              setMessage(null);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setMessage(null);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>About yourself</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Enter description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setMessage(null);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => {
              setMessage(null);
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => {
              setMessage(null);
              setConfirmPassword(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          REGISTER!
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account?{" "}
          <Link
            to={redirect ? `/lawyerLogin?redirect=${redirect}` : "/lawyerLogin"}
          >
            {" "}
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LawyerRegisterPage;
