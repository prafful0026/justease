import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listUsers } from "../../actions/userActions";
const UserListPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  const deleteHandler=()=>{
      console.log('delete')
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
              <th></th>
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
                      <LinkContainer to={`/user/${user._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                          </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user.id)}><i className='fas fa-trash'></i></Button>
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
