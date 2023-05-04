import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import { useNavigate } from "react-router-dom";

const CommentCard = ({
  text,
  commentPosted,
  firstName,
  lastName,
  commentId,
  token,
  isCommentOwner,
  swimSiteId,
  profilePhoto,
  commentOwner,
}) => {
  const navigate = useNavigate();
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
      if (updatedCommentReturned) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (e) => {
    try {
      const deletedComment = await axios.delete(
        `${DEV_API_URL}/comments/${commentId}/`,
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
    }
  };

  return (
    <Card className="comment-card-container">
      <div className="comment-photo-container"></div>
      <img
        src={profilePhoto}
        onClick={() => navigate(`/user-account/${commentOwner}`)}
      />
      <div className="comment-body-container">
        <Card.Body className="card-body">
          <div className="comment-title">
            <Card.Title>
              {firstName} {lastName} says:
            </Card.Title>
            {showButtons && (
              <>
                {!isEditing && (
                  // This removes the deleteComment button when you are editing your comment
                  <Button
                    variant="outline-secondary"
                    className="_delete-button"
                    onClick={deleteComment}
                  >
                    x
                  </Button>
                )}
              </>
            )}
          </div>

          {isEditing ? (
            <Form
              className="comment-text with-button"
              onSubmit={submitUpdatedComment}
            >
              <Form.Control
                className="comment-text-field"
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
              <Button
                variant="outline-secondary"
                className="close-update-button"
                onClick={(e) => setIsEditing(false)}
              >
                x
              </Button>
            </Form>
          ) : (
            <Card.Text className="comment-text">{text}</Card.Text>
          )}
          <Card.Text className="date-stamp-text">
            Posted on {commentPosted}.{" "}
            {showButtons && (
              <Button
                className="edit-comment-button"
                variant="link"
                size="sm"
                onClick={(e) => setIsEditing(true)}
              >
                Edit my comment
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CommentCard;
