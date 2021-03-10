import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              JUST"EASE'<i className="fas fa-gavel"></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/login' className="px-4">
              <Nav.Link >
                <i className="fas fa-user"></i>SIGN IN   
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/lawyers' className="px-4">
              <Nav.Link >
                <i className="fas fa-bookmark"></i>lawyers
              </Nav.Link>
              </LinkContainer>
            </Nav>        
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
