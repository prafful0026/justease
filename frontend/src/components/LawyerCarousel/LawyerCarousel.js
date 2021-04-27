import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { listTopLawyers } from "../../actions/lawyerActions";
import Rating from "../Rating/rating-component";

const LawyerCarousel = () => {
  const dispatch = useDispatch();

  const lawyerTopRated = useSelector((state) => state.lawyerTopRated);
  const { loading, error, lawyers } = lawyerTopRated;

  useEffect(() => {
    dispatch(listTopLawyers());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {lawyers.map((lawyer) => (
        <Carousel.Item key={lawyer._id}>
          <Link to={`/lawyers/${lawyer._id}`}>
            <Image src={lawyer.image} alt={lawyer.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h1>{lawyer.name}</h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}   
    </Carousel>
  );
};

export default LawyerCarousel;
