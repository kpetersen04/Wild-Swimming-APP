import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DEV_API_URL } from "../consts";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SwimSiteCard = ({
  // description,
  swimSitesId,
  image,
  location,
  name,
  // parking_info,
  // postcode,
  // region,
  isAccountCard,
  favoriteId,
}) => {
  const token = localStorage.getItem("token");

  // const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const deleteFromFavorites = async (e) => {
    try {
      const deletedFavorite = await axios.delete(
        `${DEV_API_URL}/favorites/${favoriteId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowError(false);
      if (deletedFavorite) {
        window.location.reload();
      }
    } catch (err) {
      setShowError(true);
      setError(
        "Network Error, your favorite was not removed. Please try again later."
      );
    }
  };

  return (
    <>
      <div>
        {isAccountCard ? (
          <Card className="account-card-container">
            <Card.Body className="_tile-container">
              <Card.Title>{name}</Card.Title>
              <Button
                variant="outline-secondary"
                className="_delete-button"
                onClick={deleteFromFavorites}
              >
                x
              </Button>
            </Card.Body>
            <Card.Img className="_image" variant="top" src={image} />
            <Card.Body>
              <Button
                className="account-card-button"
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
    </>
  );
};

export default SwimSiteCard;
