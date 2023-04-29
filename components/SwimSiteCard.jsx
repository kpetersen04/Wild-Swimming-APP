import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DEV_API_URL } from "../consts";
import { useState } from "react";
import axios from "axios";
import Heart from "react-animated-heart";

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
  const [isClick, setClick] = useState(false);

  const addToFavorites = async (e) => {
    try {
      const response = await axios.post(
        `${DEV_API_URL}/favorites/`,
        {
          site: swimSitesId,
          created_by: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFromFavorites = async (e) => {
    try {
      const deletedFavorite = await axios.delete(
        `${DEV_API_URL}/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deletedFavorite) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            <Card.Title>
              {name}{" "}
              <Heart
                isClick={isClick}
                onClick={() => {
                  setClick(!isClick);
                  addToFavorites();
                }}
              />
            </Card.Title>

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
