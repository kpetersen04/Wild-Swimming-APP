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

  const fetchData = async () => {
    try {
      const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
      console.log(dbresponse);
    } catch (err) {
      return err;
    }
  };

  const onClick = () => {
    console.log("You clicked Browse by region.");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const regions = [
    { name: "South West England", slug: "/sites-by-region" },
    { name: "South East England", slug: "/sites-by-region" },
    { name: "East England", slug: "/sites-by-region" },
    { name: "Midlands and Central England", slug: "/sites-by-region" },
    { name: "Northern England", slug: "/sites-by-region" },
    { name: "Wales", slug: "/sites-by-region" },
    { name: "Scotland", slug: "/sites-by-region" },
  ];
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
              {regions.map((link, idx) => (
                <NavDropdown.Item as={Link} to={link.slug} key={idx}>
                  {link.name}
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
