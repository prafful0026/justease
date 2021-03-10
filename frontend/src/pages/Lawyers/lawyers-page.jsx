import React,{useState,useEffect} from 'react'
// import lawyers from '../../lawyers'
import { Row,Col } from "react-bootstrap";
import Lawyer from "../../components/Lawyer/lawyer-component";
import Axios from 'axios';
const LawyersPage = () => {
    const[lawyers,setLawyers]=useState([])
    useEffect(()=>{
         const fetchLawyers=async ()=>{
             const {data}=await Axios.get('/api/lawyers')
             setLawyers(data); 
         }
         fetchLawyers()
    },[])
    return (
        <>
          <h1>OUR LAWYERS</h1>  
          <Row>
              {lawyers.map(lawyer=>(
                  <Col key={lawyer._id}  sm={12} md={6} lg={4} xl={3}>
                  <Lawyer key={lawyer._id}  lawyer={lawyer}/>
                  </Col>
              ))}
          </Row>
        </>
    )
}

export default LawyersPage  
