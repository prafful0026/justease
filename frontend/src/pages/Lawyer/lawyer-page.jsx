import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button } from "react-bootstrap";
import Rating from "../../components/Rating/rating-component";
import Axios from 'axios'
const Lawyer = ({match}) => {
    const[lawyer,setLawyer]=useState({})
    useEffect(()=>{
        const fetchLawyer=async ()=>{
            const {data}=await Axios.get(`/api/lawyers/${match.params.id}`)
            setLawyer(data); 
        }
        fetchLawyer()
    },[match]) //to avoid the dependency warning message
    return (
         <>
         <Link className='btn btn-dark my-3' to='/lawyers' >GO BACK</Link> 
         <Row>
             <Col md={6}>
                 <Image src={lawyer.image} alt={lawyer.name} fluid/>  
             </Col>
             <Col md={3}>
                 <ListGroup variant='flush'> 
                 <ListGroup.Item>
                      <h3 >{lawyer.name}</h3>
                 </ListGroup.Item>
                 <ListGroup.Item>
                      <Rating value={lawyer.rating} text={`${lawyer.numReviews} reviews`}/>
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
                         <Col>
                         Speciality : {lawyer.category}
                         </Col>      
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                         <Col>
                         Available : {lawyer.isAvailable? "YES" : "NO" }
                         </Col>   
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button className='btn-block' type='button ' disabled={!lawyer.isAvailable}>
                            {lawyer.isAvailable?"BOOK AN APPOINTMENT":"NOT AVAILABLE"}
                         </Button>
                     </ListGroup.Item>
                     </ListGroup>
                 </Card>
             </Col>
        </Row>   
         </>      
    )
}

export default Lawyer
