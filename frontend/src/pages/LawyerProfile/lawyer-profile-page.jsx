import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import axios from "axios";

import { LAWYER_DETAILS_RESET } from "../../constants/lawyerConstants.js";
import {
  updateUserProfile,
} from "../../actions/userActions.js";
import { listLawyerDetails } from "../../actions/lawyerActions.js";

const LawyerProfilePage = ({ location, history }) => {
  const [liscenceID, setLiscenceID] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("choose file");
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [available, setAvailable] = useState("");

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const lawyerDetails = useSelector((state) => state.lawyerDetails);
  const { loading, error, lawyer } = lawyerDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (!userInfo) {
      history.push("/lawyerLogin");
    } else {
      if (!lawyer.name) {
        dispatch({ type: LAWYER_DETAILS_RESET });
        dispatch(listLawyerDetails(userInfo._id));
      } else {
        setName(lawyer.name);
        setEmail(lawyer.email);
        setLiscenceID(lawyer.liscenceID);
        setCategory(lawyer.category);
        setDescription(lawyer.description);
        if (lawyer.isAvailable) setAvailable("true");
        else setAvailable("false");
      }
    }
  }, [dispatch, history, userInfo, lawyer._id,lawyer.category,lawyer.liscenceID,lawyer.description,lawyer.isAvailable,lawyer.name,lawyer.email]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setLabel("UPLOADED SUCCESSFULLY!!!");
      setUploading(false);
    } catch (error) {
      setLabel("TRY AGAIN!!");
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords dont match");
    } else {
      // const userType="lawyer"
      dispatch(
        updateUserProfile({
          id: lawyer._id,
          name,
          email,
          password,
          image,
          description,
          category,
          available,
          userType: "lawyer",
        })
      );
    }
  };
  const availableHandler = (e) => {
    console.log(e.target.value);
    setAvailable(e.target.value);
  };

  return (
    <Row style={{ display: "flex", justifyContent: "center" }}>
      <Col md={3}>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {/* {errorMessage && <Message variant="danger">{errorMessage}</Message>} */}
        {success && <Message variant='success'>DATA UPDATED</Message>}
        {loading && <Loader></Loader>}
        <h2>YOUR PROFILE</h2>
        <img style={{ width: "100%" }} src={lawyer.image} alt='' />
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
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              disabled={true}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage(null);
                // setErrorMessage(null);
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
              disabled={true}
              placeholder='Enter LiscenceID'
              value={liscenceID}
              onChange={(e) => {
                setLiscenceID(e.target.value);
                setMessage(null);
                setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='verified'>
            <Form.Label>VERIFIED</Form.Label>
            <Form.Control
              disabled={true}
              value={lawyer.isVerified?"YES":"NO"}
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

          <Form.Group controlId='available'>
            <Form.Label>Are you available</Form.Label>

            <Form.Control
              name='avl'
              as='select'
              custom
              onChange={availableHandler}
            >
              {lawyer.isAvailable  ? (
                <>
                  <option value='true'>YES</option>
                  <option value='false'>NO</option>
                </>
              ) : (
                <>
                  <option value='false'>NO</option>
                  <option value='true'>YES</option>
                </>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>description</Form.Label>
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
                // setErrorMessage(null);
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
                // setErrorMessage(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Button style={{ width: "100%" }} type='submit' variant='primary'>
            UPDATE
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default LawyerProfilePage;
