import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import DetailedSwimSiteCard from "../components/DetailedSwimSiteCard";
import CommentCard from "../components/CommentCard";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingVisual from "../components/LoadingVisual";
import Heart from "react-animated-heart";

const SingleSwimSite = () => {
  const { id } = useParams();
  const [swimSite, setSwimSite] = useState([]);
  const [swimSiteId, setSwimSiteId] = useState();
  const [comments, setComments] = useState([]);
  const [canAccessComment, setCanAccessComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const commentData = {
    text: "",
    site: "",
    createdBy: "",
  };
  const [commentToAdd, setCommentToAdd] = useState(commentData);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const [isClick, setClick] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/swim-sites/${id}/`);
        setSwimSite(data);
        setSwimSiteId(data.id);
        setComments(data.comments);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addToFavorites = async (e) => {
    try {
      if (isLoggedIn) {
        const response = await axios.post(
          `${DEV_API_URL}/favorites/`,
          {
            site: swimSiteId,
            created_by: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        navigate(`/sign-in`);
      }
    } catch (err) {
      console.log(err);
      setClick(false);
      setShowError(true);
      console.log(err.response.data.detail);
      setError(err.response.data.detail);
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

  const clearErrors = (e) => {
    setShowError(false);
    setError("");
  };

  const accessComment = (e) => {
    if (isLoggedIn) {
      setCanAccessComment(true);
    } else {
      navigate("/sign-in");
    }
  };

  const onChange = (e) => {
    setCommentToAdd({
      ...setCommentToAdd,
      [e.target.name]: e.target.value,
    });
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      const newComment = axios.post(
        `${DEV_API_URL}/comments/`,
        {
          ...commentToAdd,
          site: id,
          created_by: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (newComment) {
        setCanAccessComment(false);
        // Is there a better way to do this?
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single-swim-site-page">
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <div>
          <div className="header-container">
            <h1>{swimSite.name}</h1>
            <Heart
              isClick={isClick}
              onClick={() => {
                setClick(!isClick);
                addToFavorites();
              }}
            />
          </div>
          {showError && (
            <Card.Text className="error-container">
              {error}
              <Button
                className="_error-delete-button"
                variant="outline-secondary"
                onClick={clearErrors}
              >
                x
              </Button>
            </Card.Text>
          )}

          <DetailedSwimSiteCard swimSite={swimSite} />
          <div className="comments-section">
            <h3 className="comments-header">Comments</h3>
            <Button variant="link" size="sm" onClick={accessComment}>
              Add a comment
            </Button>
            {canAccessComment && (
              <ul className="add-comment">
                <li className="add-comment">
                  <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="commentText">
                      <Form.Control
                        type="text"
                        name="text"
                        placeholder="Enter your comment text and press enter to add!"
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Form>
                </li>
              </ul>
            )}
            <div className="_all-comments-container">
              <ul>
                {comments.map(({ id, text, created_at, created_by }) => {
                  const { first_name, last_name } = created_by;
                  const dateObject = new Date(created_at);
                  const createdAtLongFormat = dateObject.toLocaleDateString(
                    "en-UK",
                    { month: "long", day: "numeric", year: "numeric" }
                  );
                  return (
                    <li key={id}>
                      <CommentCard
                        commentId={id}
                        text={text}
                        firstName={first_name}
                        lastName={last_name}
                        commentPosted={createdAtLongFormat}
                        token={token}
                        isCommentOwner={created_by.id === userId}
                        swimSiteId={swimSite.id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSwimSite;
