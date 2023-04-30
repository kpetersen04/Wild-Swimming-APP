import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import DetailedSwimSiteCard from "../components/DetailedSwimSiteCard";
import CommentCard from "../components/CommentCard";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingVisual from "../components/LoadingVisual";

const SingleSwimSite = () => {
  const { id } = useParams();
  const [swimSite, setSwimSite] = useState([]);
  const [comments, setComments] = useState([]);
  const [canAccessComment, setCanAccessComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const commentData = {
    text: "",
    site: "",
    createdBy: "",
  };
  const [commentToAdd, setCommentToAdd] = useState(commentData);
  const [isloggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DEV_API_URL}/swim-sites/${id}/`);
      setSwimSite(data);
      setComments(data.comments);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const accessComment = (e) => {
    if (isloggedIn) {
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
    <div>
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <div>
          <h1>{swimSite.name}</h1>
          <DetailedSwimSiteCard swimSite={swimSite} />
          <h3>Comments</h3>
          <Button variant="link" size="sm" onClick={accessComment}>
            Add a comment
          </Button>
          <div className="comments-container">
            {canAccessComment && (
              <ul>
                <li>
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
            <ul>
              {comments.map(({ id, text, created_at, created_by }) => {
                const { first_name, last_name } = created_by;
                return (
                  <li key={id}>
                    <CommentCard
                      commentId={id}
                      text={text}
                      firstName={first_name}
                      lastName={last_name}
                      commentPosted={created_at}
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
      )}
    </div>
  );
};

export default SingleSwimSite;
