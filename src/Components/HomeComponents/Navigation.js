import React, {useContext} from "react";
import {  Container, Nav, Navbar } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import  AuthContext  from "./Auth1";
import firebaseConfig from "./config";

const Navigation = () => {

  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Job Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/documents">Documents</Nav.Link>
            <Nav.Link href="/certificates">Certificates</Nav.Link>
            <Nav.Link onClick={() => {firebaseConfig.auth().signOut();navigate('/')}}>Sign Out</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              <div>{currentUser ? (<>Hi, <a href="/profile">{currentUser.email} </a></>) : (<></>)}</div>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
