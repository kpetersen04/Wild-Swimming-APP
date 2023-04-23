import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DEV_API_URL } from "../consts";
import { useState } from "react";

const SwimSiteCard = ({
  description,
  swimSitesId,
  image,
  location,
  name,
  parking_info,
  postcode,
  region,
}) => {
  return (
    <div>
      <Card style={{ width: "20rem" }}>
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
    </div>
  );
};

export default SwimSiteCard;
