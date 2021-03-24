import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import FormContainer from "../../components/FormContainer/FormContainer.jsx";
import { listLawyerDetails } from "../../actions/lawyerActions.js";
const AppointPage = ({ location, history, match }) => {
  
  const [desc, setDesc] = useState("");
  const [evidence, setEvidence] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const lawyerDetails = useSelector((state) => state.lawyerDetails)
  const Lawyer = lawyerDetails;

  useEffect(() => {
    dispatch(listLawyerDetails(match.params.id));
    if (!userInfo) history.push("/userLogin");
    else if (!Lawyer.lawyer) setErrorMessage("LAWYER NOT FOUND!!");
    else if (Lawyer.lawyer && !Lawyer.lawyer.isAvailable)
      setErrorMessage("LAWYER NOT AVAILABLE!!");
  }, [dispatch, match, Lawyer.lawyer, history, userInfo]);


  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <h1>appoint</h1>
      {error && <Message variant="danger">{error}</Message>}
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="desc">
          <Form.Label>CASE DESC</Form.Label>
          <Form.Control
            type="text"
            disabled={!Lawyer.lawyer || !Lawyer.lawyer.isAvailable}
            placeholder="Enter Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="evidence">
          <Form.Label>EVIDENCE</Form.Label>
          <Form.Control
            disabled={!Lawyer.lawyer || !Lawyer.lawyer.isAvailable}
            type="text"
            placeholder="Enter Evidence"
            value={evidence}
            onChange={(e) => {
              setEvidence(e.target.value);
              setErrorMessage(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={!Lawyer.lawyer || !Lawyer.lawyer.isAvailable}
          type="submit"
          variant="primary"
        >
          Appoint
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AppointPage;
