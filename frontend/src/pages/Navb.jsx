import React from "react";
import './style/Navb.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navb = () => {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/" className="logo">Academify</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto"> {/* This class aligns items to the right */}
              <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
            <div className="header-btn"> {/* This class aligns items to the right */}
              <a
                className="btn-default btn-small round btn-grad"
                target="_blank"
                href="#"
              >
                Sign In
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navb;