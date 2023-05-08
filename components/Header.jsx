import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";

const Header = () => {
  const navigate = useNavigate();
  const [regionsData, setRegionsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const id = localStorage.getItem("userId");

  const fetchData = async (e) => {
    try {
      const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
      const regionsInfo = dbresponse.data;
      setRegionsData(regionsInfo);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, [location]);

  const signOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar className="nav-bar" bg="dark" variant="dark" expand="sm">
        <Container className="nav-bar-container">
          <Navbar.Brand as={Link} to={"/"} onClick="hide.bs.dropdown">
            Wild Swimming
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/about"} onClick="hide.bs.dropdown">
                About
              </Nav.Link>
              <NavDropdown
                className="dropdown-title"
                title="Browse by Region"
                id="basic-nav-dropdown"
                onClick={fetchData}
              >
                {regionsData.map((region, idx) => (
                  <NavDropdown.Item
                    className="dropdown-items"
                    onClick="hide.bs.dropdown"
                    id={region.id}
                    href={`/sites-by-region/${region.id}/`}
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
                  <Nav className="me-auto">
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => navigate(`/my-account/${id}`)}
                      >
                        My Prolife
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/"} onClick={signOut}>
                        Sign Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/sign-in"}
                    onClick="hide.bs.dropdown"
                  >
                    Sign In
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/register"}
                    onClick="hide.bs.dropdown"
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
