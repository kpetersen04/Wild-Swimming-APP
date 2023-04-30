import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
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
  isCommentOwner,
  swimSiteId,
}) => {
  const [showError, setShowError] = useState(false);
  const [showButtons, setShowButtons] = useState(isCommentOwner);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");
  const [updatedComment, setUpdatedComment] = useState({
    text: text,
    site: "",
    created_by: "",
  });

  const submitUpdatedComment = async (e) => {
    e.preventDefault();
    try {
      const updatedCommentReturned = await axios.put(
        `${DEV_API_URL}/comments/${commentId}/`,
        { ...updatedComment, site: swimSiteId, created_by: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(updatedCommentReturned);
      if (updatedCommentReturned) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          {showButtons && (
            <Button variant="outline-danger" onClick={deleteComment}>
              x
            </Button>
          )}
          {isEditing ? (
            <Form onSubmit={submitUpdatedComment}>
              <Form.Control
                type="text"
                value={updatedComment.text}
                name="text"
                onChange={(e) =>
                  setUpdatedComment({
                    ...updatedComment,
                    text: e.target.value,
                  })
                }
              />
            </Form>
          ) : (
            <Card.Text>
              {text}
              {showButtons && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={(e) => setIsEditing(true)}
                >
                  edit my comment
                </Button>
              )}
            </Card.Text>
          )}
          <Card.Text>{commentPosted}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentCard;
