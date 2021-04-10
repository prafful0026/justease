import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { listLawyerDetails } from "../../actions/lawyerActions.js";
const AppointPage = ({ location, history, match }) => {
  const [caseDescription, setCaseDescription] = useState("");
  const [caseCategory, setCaseCategory] = useState("");
  const [caseId, setCaseId] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

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

  const submitHandler = (e) => {
    let userId=userInfo._id
    let lawyerId=lawyer._id

    e.preventDefault()
    const Case={caseId,caseCategory,caseDescription,email,lawyerId,userId}
    console.log(Case)
  };
  return (
    <FormContainer>
      <h1>appoint</h1>
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
            type='tel'
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
