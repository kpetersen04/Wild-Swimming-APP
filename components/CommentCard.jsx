import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";

const CommentCard = ({
  text,
  commentPosted,
  firstName,
  lastName,
  commentId,
  token,
}) => {
  const [isCommentOwner, setIsCommentOwner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  // const getCommentOwner = async () => {

  // }

  const deleteComment = async (e) => {
    console.log("delete clicked");
    console.log(commentId);
    try {
      const deletedComment = await axios.delete(
        `${DEV_API_URL}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deletedComment) {
        window.location.reload();
      }
    } catch (err) {
      const { detail } = err.response.data;
      console.log(detail);

      setShowError(true);
      setError(
        "This is not your comment. Users can only delete their own comments."
      );
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          {showError && (
            <div>
              <p>{error}</p>{" "}
              <Button
                variant="outline-secondary"
                onClick={() => setShowError(false)}
              >
                x
              </Button>
            </div>
          )}
          <Card.Title>
            {firstName} {lastName} says:{" "}
          </Card.Title>{" "}
          {isCommentOwner && (
            <Button variant="outline-danger" onClick={deleteComment}>
              x
            </Button>
          )}
          <Card.Text>{text}</Card.Text>
          <Card.Text>{commentPosted}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentCard;
