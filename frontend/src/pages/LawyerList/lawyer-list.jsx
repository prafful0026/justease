import React, { useEffect } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listLawyers,deleteLaywer,verifyLaywer } from "../../actions/lawyerActions";

const LawyerList = ({ history }) => {
  const dispatch = useDispatch();
  const lawyerList = useSelector((state) => state.lawyerList);
  const { loading, error, lawyers } = lawyerList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const lawyerDelete=useSelector((state)=>state.lawyerDelete)
  const {success:deleteSuccess,error:deleteError}=lawyerDelete 

  const lawyerVerify=useSelector((state)=>state.lawyerVerify)
  const {success:verifySuccess,error:verifyError}=lawyerVerify 

  useEffect(() => {
    if (userInfo && userInfo.userType === "admin") {
      dispatch(listLawyers());
    } else {
      history.push("/userLogin");
    }
  }, [dispatch, history, userInfo,deleteSuccess,verifySuccess]);
  const deleteHandler = (id) => {
    console.log("delete");
    dispatch(deleteLaywer(id))
  };
  const verifyHandler = (id) => {
    console.log("verify");
    dispatch(verifyLaywer(id))
  };
  return (
    <>
      <h1>LAWYERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>liscence ID</th>
              <th>EMAIL</th>
              <th>Is verified?</th>
              <th>Verify</th>
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer._id}>
                <td>{lawyer.name}</td>
                <td>{lawyer.liscenceID}</td>
                <td>
                  <a href={`mailto:${lawyer.email}`}>{lawyer.email}</a>
                </td>
                {lawyer.isVerified ? (
                  <td style={{ color: "green" }}>YES</td>
                ) : (
                  <td style={{ color: "red" }}>NO</td>
                )}
                <td>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() =>verifyHandler(lawyer._id)}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(lawyer._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default LawyerList;
