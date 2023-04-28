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
      console.log(dbresponse.data);
      setRegionsData(regionsInfo);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
    console.log("location updated");
  }, [location]);
  console.log(isLoggedIn);

  const onClick = () => {
    fetchData();
  };

  const signOut = (e) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Wild Swimming
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/about"}>
              About
            </Nav.Link>
            <NavDropdown
              title="Browse by Region"
              id="basic-nav-dropdown"
              onClick={onClick}
            >
              {regionsData.map((region, idx) => (
                <NavDropdown.Item
                  as={Link}
                  to={`/sites-by-region/${region.id}`}
                  key={idx}
                  // onClick={onClick}
                >
                  {region.region_name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to={`/my-account/${id}`}>
                  My Account
                </Nav.Link>
                <Nav.Link as={Link} to={"/"} onClick={signOut}>
                  Sign Out
                </Nav.Link>
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
