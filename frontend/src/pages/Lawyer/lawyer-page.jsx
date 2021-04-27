import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button ,Form} from "react-bootstrap";
import Rating from "../../components/Rating/rating-component";
import { useDispatch, useSelector } from "react-redux";
import {
  listLawyerDetails,
  createLawyerReview,
} from "../../actions/lawyerActions.js";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message.jsx";
import { LAWYER_REVIEW_RESET } from "../../constants/lawyerConstants.js";
// import Rating from "../../components/Rating/rating-component.jsx"
const LawyerPage = ({ history, match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
   
  const lawyerDetails = useSelector((state) => state.lawyerDetails);
  const { loading, error, lawyer } = lawyerDetails;

  const lawyerReview = useSelector((state) => state.lawyerReview);
  const { success, error: reviewError } = lawyerReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler=(e)=>{
   e.preventDefault();

   dispatch(createLawyerReview(match.params.id,{rating,comment}))


  }

  useEffect(() => {
    if(userInfo&&(userInfo.userType==="lawyer"||userInfo.userType==="admin"))
    history.push('/');
    // console.log(lawyer);
    // lawyer.reviews.map((review) => console.log(review.name));
    // console.log(success)
    if(success)
    {
      alert("review submitted")
      setRating(0)
      setComment("")

      dispatch({type:LAWYER_REVIEW_RESET })

    }
    dispatch(listLawyerDetails(match.params.id));
   
    // if (!userInfo || userInfo.userType === "user") {
    //   if (!lawyer._id || lawyer._id !== match.params.id) {

    //   }
    // } else history.push("/");
    //  dispatch(listLawyerDetails(match.params.id));
    if (lawyer.isVerified === false) history.push("/lawyers");
  }, [success,dispatch, match,history]); //to avoid the dependency warning message
  const bookAppointmentHandler = () => {
    history.push(`/appoint/${match.params.id}`);
  };
  return (
    <>
      <Link className='btn btn-dark my-3' to='/lawyers'>
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={lawyer.image} alt={lawyer.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
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
                <ListGroup variant='flush'>
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
                      className='btn-block'
                      type='button '
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
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {lawyer.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {lawyer.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <h5>{review.name.toUpperCase()}</h5>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>WRITE A REVIEW</h3>
                  {reviewError && <Message variant="danger">{reviewError}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                   <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        // disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/userLogin'>sign in</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default LawyerPage;
  