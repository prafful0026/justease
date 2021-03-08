import {Link} from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button } from "react-bootstrap";
import Rating from "../../components/Rating/rating-component";
import lawyers from '../../lawyers'
const Lawyer = ({match}) => {
    const lawyer=lawyers.find(p=>p._id===match.params.id)
    return (
         <>
         <Link className='btn btn-dark my-3' to='/' >GO BACK</Link> 
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
