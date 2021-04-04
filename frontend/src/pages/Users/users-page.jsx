import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listUsers,deleteUser } from "../../actions/userActions";
const UserListPage = ({history}) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success:successDelete } = userDelete;

  useEffect(() => {
    if(userInfo&&userInfo.userType==="admin")
    {
      dispatch(listUsers());
    }
    else
    {
        history.push('/userLogin')
    }
  }, [dispatch,history,successDelete,userInfo]);

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure'))
      dispatch(deleteUser(id))

  }
  return (
    <>
      <h1>USERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>DELETE USER</th>
            </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.userType === "admin" ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </td>
                  <td>
                      <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          
        </Table>
      )}
    </>
  );
};

export default UserListPage;
