import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating/rating-component";
import { useDispatch, useSelector } from "react-redux";
import { listLawyerDetails } from "../../actions/lawyerActions.js";
import Loader from "../../components/Loader/Loader";
import Message from '../../components/Message/Message.jsx'


const LawyerPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const lawyerDetails = useSelector((state) => state.lawyerDetails);
  const { loading, error, lawyer } = lawyerDetails;
  useEffect(() => {
    dispatch(listLawyerDetails(match.params.id));
  }, [dispatch, match]); //to avoid the dependency warning message
  const bookAppointmentHandler=()=>{
     history.push(`/appoint/${match.params.id}`)
  }
  return (
    <>
      <Link className="btn btn-dark my-3" to="/lawyers">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={lawyer.image} alt={lawyer.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{lawyer.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={lawyer.rating}
                  text={`${lawyer.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Description : {lawyer.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Speciality : {lawyer.category}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Available : {lawyer.isAvailable ? "YES" : "NO"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={bookAppointmentHandler}
                    className="btn-block"
                    type="button "
                    disabled={!lawyer.isAvailable}
                  >
                    {lawyer.isAvailable
                      ? "BOOK AN APPOINTMENT"
                      : "NOT AVAILABLE"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LawyerPage;
