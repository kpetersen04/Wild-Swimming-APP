import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import DetailedSwimSiteCard from "../components/DetailedSwimSiteCard";
import CommentCard from "../components/CommentCard";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SingleSwimSite = () => {
  const { id } = useParams();
  const [swimSite, setSwimSite] = useState([]);
  const [comments, setComments] = useState([]);
  const [canAccessComment, setCanAccessComment] = useState(false);
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
      console.log(data);
      setSwimSite(data);
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  // katie@gmail.com
  // 12345678!
  useEffect(() => {
    fetchData();
  }, []);

  const accessComment = (e) => {
    console.log("Add Comment button clicked.");
    if (isloggedIn) {
      setCanAccessComment(true);
    } else {
      navigate("/sign-in");
    }
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setCommentToAdd({
      ...setCommentToAdd,
      [e.target.name]: e.target.value,
    });
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      const userId = decodedToken.sub;
      // console.log(userId);
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
        console.log("There is a new comment.");
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
  );
};

export default SingleSwimSite;
