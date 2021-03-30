import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown ,Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.js";

const Header = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(() => {
    if (userInfo) setName(userInfo.name);
  }, [setName, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    // console.log(userInfo)
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              JUST"EASE'<i className="fas fa-gavel"></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/lawyers" className="px-4">
                <Nav.Link>
                  <i className="fas fa-bookmark"></i>lawyers
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.userType === "admin" ? (
                <>
                <LinkContainer to="/profile">
                    <Nav.Link>
                  profile
                </Nav.Link>
                </LinkContainer>
                <Button onClick={logoutHandler}>
                  <Nav.Link>
                  logout
                </Nav.Link>
                  </Button>
                  
                <NavDropdown className="px-4" title="ADMIN" id="adminmenu">
                  <LinkContainer to="/admin/userList">
                  

                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/lawyerList">
                    <NavDropdown.Item>Lawyers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/caseList">
                    <NavDropdown.Item>Cases</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                </>
              ) : userInfo ? (
                <NavDropdown className="px-4" title={name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown className="px-4" title="LOGIN/SIGNUP">
                  <LinkContainer to="/userLogin">
                    <NavDropdown.Item>USER</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/lawyerLogin">
                    <NavDropdown.Item>LAWYER</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
