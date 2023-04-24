import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CommentCard = ({ text, commentPosted, firstName, lastName }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {firstName} {lastName} says:{" "}
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>{commentPosted}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
