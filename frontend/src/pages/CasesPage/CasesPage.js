import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listCases,deleteCase,acceptCase } from "../../actions/caseActions.js"

const CasesPage = ({history,location}) => {
    const dispatch = useDispatch();

  const caseList = useSelector((state) => state.caseList);
  const { loading, error, cases } = caseList;
//   const [userType]=useState("")
  const userLogin = useSelector((state) => state.userLogin); 
  const { userInfo } = userLogin;

  const caseDelete=useSelector((state)=>state.caseDelete)
  const {success:deleteSuccess,error:deleteError}=caseDelete 

  const caseAccept=useSelector((state)=>state.caseAccept)
  const {success:acceptSuccess,error:acceptError}=caseAccept
  
  useEffect(() => {
    if(userInfo)
    {
      dispatch(listCases());
    }
    else
    {
        history.push('/userLogin')
    }
  }, [dispatch,history,userInfo,deleteSuccess,acceptSuccess]);

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure'))
      dispatch(deleteCase(id))
    console.log("case delete  ")
  }
  const acceptHandler = (id) => {
    console.log("Accept");
    dispatch(acceptCase(id))
  };
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
                <th>Case Status</th>
                <th>Delete Case</th>
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
                    <>
                        {userCase.isAccepted===false?<td style={{color:"red"}}>Not accepted by lawyer</td>:<td style={{color:"green"}}>Active</td>}
                    </>
                    <td>
                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(userCase._id)}><i className='fas fa-trash'></i></Button>
                    </td>
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
                    <th>Case status</th>
                    <th>Delete Case</th>
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
                        {userCase.isAccepted===false?(<td>
                          <Button srtle={{color:"green"}} className='btn-sm' onClick={()=>acceptHandler(userCase._id)}>Accept <i class="fas fa-check-square"></i></Button>
                        </td>):(<td style={{color:"green"}}>Actice</td>)}
                        <td>
                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(userCase._id)}><i className='fas fa-trash'></i></Button>
                    </td> 
                      </tr>
                    ))}
                  </tbody>
                
              </Table>
            )}</>)}
        
      </>
    )
}

export default CasesPage
