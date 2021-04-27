import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { listLawyerDetails } from "../../actions/lawyerActions.js";
import axios from "axios";
import { createCase } from "../../actions/caseActions.js";
const AppointPage = ({ location, history, match }) => {
  const [caseDescription, setCaseDescription] = useState("");
  const [caseCategory, setCaseCategory] = useState("");
  const [caseId, setCaseId] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // const [success,setSuccess]=useState(false)
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const caseCreate = useSelector((state) => state.caseCreate);
  const { success, error: caseError } = caseCreate;

  const lawyerDetails = useSelector((state) => state.lawyerDetails);
  const { lawyer, error: lawyerError } = lawyerDetails;

  useEffect(() => {
    if (!userInfo) history.push("/userLogin");
    dispatch(listLawyerDetails(match.params.id));
    if (lawyer.name && !lawyer.isAvailable)
      setErrorMessage("LAWYER NOT AVAILABLE!!");
  }, [dispatch, match, history, lawyer.isAvailable]);

  useEffect(() => {
    if (lawyerError) setErrorMessage("LAWYER NOT FOUND!!");
  }, [lawyerError]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userId = userInfo._id;
    const lawyerId = lawyer._id;
    const lawyerName = lawyer.name;
    const userName = userInfo.name;
    const Case = {
      caseId,
      caseCategory,
      caseDescription,
      email,
      lawyerId,
      userId,
    };
    console.log(Case);
    dispatch(
      createCase({
        caseId,
        caseCategory,
        caseDescription,
        email,
        lawyerId,
        userId,
        contactNo,
        lawyerName,
        userName,
      })
    );
  };
  useEffect(() => {
    if(userInfo&&(userInfo.userType==="lawyer"||userInfo.userType==="admin"))
    history.push('/');
    if (success) history.push("/cases");
  }, [success, history]);
  return (
    <FormContainer>
      <h1>appoint</h1>
      {caseError && <Message variant='danger'>{caseError}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='caseId'>
          <Form.Label>Case ID</Form.Label>
          <Form.Control
            disabled={!lawyer || !lawyer.isAvailable}
            type='text'
            placeholder='Enter caseId'
            value={caseId}
            onChange={(e) => {
              setCaseId(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            disabled={!lawyer || !lawyer.isAvailable}
            type='text'
            placeholder='Enter Category'
            value={caseCategory}
            onChange={(e) => {
              setCaseCategory(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>CASE DESC</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            disabled={!lawyer || !lawyer.isAvailable}
            placeholder='Enter Description'
            value={caseDescription}
            onChange={(e) => {
              setCaseDescription(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            disabled={!lawyer || !lawyer.isAvailable}
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contactNo'>
          <Form.Label>Your Contact No.</Form.Label>
          <Form.Control
            disabled={!lawyer || !lawyer.isAvailable}
            type='text'
            placeholder='Enter Contact Number'
            value={contactNo}
            onChange={(e) => {
              setContactNo(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={!lawyer || !lawyer.isAvailable}
          type='submit'
          variant='primary'
        >
          Appoint
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AppointPage;
