import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SwimSiteCard = ({
  description,
  id,
  image,
  location,
  name,
  parking_info,
  postcode,
  region,
}) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{location}</Card.Text>
        <Button variant="primary">View More Details</Button>
      </Card.Body>
    </Card>
  );
};

export default SwimSiteCard;
