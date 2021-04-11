import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listCases } from "../../actions/caseActions.js"

const CasesPage = ({history,location}) => {
    const dispatch = useDispatch();

  const caseList = useSelector((state) => state.caseList);
  const { loading, error, cases } = caseList;
//   const [userType]=useState("")
  const userLogin = useSelector((state) => state.userLogin); 
  const { userInfo } = userLogin;

  useEffect(() => {
    if(userInfo)
    {
      dispatch(listCases());
    }
    else
    {
        history.push('/userLogin')
    }
  }, [dispatch,history,userInfo]);


    return (
        <>
        {userInfo && userInfo.userType==="user"?(<><h1>Cases</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Case Category</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Lawyer</th>
              </tr>
              </thead>
              <tbody>
                {cases.map((userCase) => (
                  <tr key={userCase._id}>
                    <td>{userCase.caseId}</td>
                    <td>{userCase.caseCategory}</td>
                    <td>
                      <a href={`mailto:${userCase.email}`}>{userCase.email}</a>
                    </td>
                    <td>{userCase.contactNo}</td>
                    <td>
                      <a href={`/lawyers/${userCase.lawyerId}`}>
                         {userCase.lawyerName}
                      </a>
                    </td>
                    {/* <td>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            
          </Table>
        )}</>):(<><h1>Cases</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Case Category</th>
                    <th>Client Email</th>
                    <th>Client Contact No.</th>
                    <th>Client Name</th>
                  </tr>
                  </thead>
                  <tbody>
                    {cases.map((userCase) => (
                      <tr key={userCase._id}>
                        <td>{userCase.caseId}</td>
                        <td>{userCase.caseCategory}</td>
                        <td>
                          <a href={`mailto:${userCase.email}`}>{userCase.email}</a>
                        </td>
                        <td>{userCase.contactNo}</td>
                        <td>
                          < >
                             {userCase.userName}
                          </>
                        </td>
                        {/* <td>
                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                
              </Table>
            )}</>)}
        
      </>
    )
}

export default CasesPage
