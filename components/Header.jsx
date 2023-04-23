import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";

const Header = () => {
  const [regionsData, setRegionsData] = useState([]);
  // const [isFirstClick, setIsFirstClick] = useState(true);

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

  const onClick = () => {
    // if (isFirstClick) {
    fetchData();
    // setIsFirstClick(false);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                >
                  {region.region_name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to={"/sign-in"}>
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to={"/register"}>
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
