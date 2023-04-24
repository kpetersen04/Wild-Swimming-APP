import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const DetailedSwimSiteCard = ({ swimSite }) => {
  return (
    <div className="card-container">
      <Card style={{ width: "35rem" }}>
        <Card.Img
          className="card-img-single-site"
          variant="top"
          src={swimSite.image}
        />
      </Card>
      <Card className="text-body">
        <Card.Body>
          <Card.Text>{swimSite.description}</Card.Text>
          <Card.Text>
            Location: {swimSite.location}, {swimSite.postcode}
          </Card.Text>
          <Card.Text>Parking: {swimSite.parking_info}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailedSwimSiteCard;
