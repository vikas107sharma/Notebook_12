import React from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Fab from '@mui/material/Fab';
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  return (
    <>
      <div>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand
              className="font-black logo text-3xl tracking-wide"
              as={Link}
              to="/"
            >
              Notebook
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="flex">
              <Nav className="md:ml-auto lg:ml-auto sm:ml-0">
                <Nav.Link
                  className="hover:bg-gray-100 text-base text-black font-medium"
                  as={Link}
                  to="/"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="hover:bg-gray-100 text-base text-black font-medium"
                  as={Link}
                  to="/createnote"
                >
                  Write...
                </Nav.Link>
               

               
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default Header;
