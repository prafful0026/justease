import React from "react";
import { Card } from "react-bootstrap";
import Rating from '../Rating/rating-component.jsx'
const Lawyer = ({ lawyer }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/lawyer/${lawyer._id}`}>
        <Card.Img src={lawyer.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/lawyer/${lawyer._id}`}>
          <Card.Title as="div">
            <strong>{lawyer.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
         <div className='my-3'>
             <strong>SPECIALITY : {lawyer.category}</strong> 
         </div>
        </Card.Text>
        <Card.Text as='div'>
         <div className='my-3'>
             <Rating  value={lawyer.rating} text={`${lawyer.numReviews} reviews`}/>
         </div>
        </Card.Text>
     
      </Card.Body>
    </Card>
  );
};

export default Lawyer;
