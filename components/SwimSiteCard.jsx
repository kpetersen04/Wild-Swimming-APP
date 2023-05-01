import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DEV_API_URL } from "../consts";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SwimSiteCard = ({
  description,
  swimSitesId,
  image,
  location,
  name,
  parking_info,
  postcode,
  region,
  isAccountCard,
  favoriteId,
}) => {
  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  return (
    <div>
      {isAccountCard ? (
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Button variant="outline-danger" onClick={deleteFromFavorites}>
              x
            </Button>
          </Card.Body>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{location}</Card.Text>
            <Button
              variant="primary"
              as={Link}
              to={`/swim-sites/${swimSitesId}/`}
            >
              View More Details
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{name} </Card.Title>

            <Card.Text>{location}</Card.Text>
            <Button
              variant="primary"
              as={Link}
              to={`/swim-sites/${swimSitesId}/`}
            >
              View More Details
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SwimSiteCard;
