import React from "react";
import { Card } from "react-bootstrap";
import Rating from '../Rating/rating-component.jsx'
const Lawyer = ({ lawyer }) => {
  return (
    <Card style={{height:'400px'}} className="my-3 p-3 rounded">
      <a href={`/lawyers/${lawyer._id}`}>
        <Card.Img style={{height:"200px"}} src={lawyer.image}variant="top" />
      </a>
      <Card.Body>
        <a href={`/lawyers/${lawyer._id}`}>
          <Card.Title as="div">
            <strong>{lawyer.name.toUpperCase()}</strong>
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
