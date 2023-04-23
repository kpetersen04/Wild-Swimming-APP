import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const DetailedSwimSiteCard = ({ swimSite }) => {
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={swimSite.image} />
        <Card.Body>
          <Card.Title>{swimSite.name}</Card.Title>
          <Card.Text>
            {swimSite.location}, {swimSite.postcode}
          </Card.Text>
          <Card.Text>{swimSite.description}</Card.Text>
          <Card.Text>Parking: {swimSite.parking_info}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailedSwimSiteCard;
