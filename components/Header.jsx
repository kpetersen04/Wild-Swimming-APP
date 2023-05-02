import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";

const Header = () => {
  const [regionsData, setRegionsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const id = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
      const regionsInfo = dbresponse.data;
      setRegionsData(regionsInfo);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, [location]);

  const signOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Wild Swimming
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/about"}>
              About
            </Nav.Link>
            <NavDropdown title="Browse by Region" id="basic-nav-dropdown">
              {regionsData.map((region, idx) => (
                <NavDropdown.Item
                  id={region.id}
                  href={`/sites-by-region/${region.id}`}
                  key={idx}
                >
                  {region.region_name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to={`/my-account/${id}`}>
                        My Prolife
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/"} onClick={signOut}>
                        Sign Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={"/sign-in"}>
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to={"/register"}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
