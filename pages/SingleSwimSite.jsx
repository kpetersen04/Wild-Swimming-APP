import axios from "axios";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import DetailedSwimSiteCard from "../components/DetailedSwimSiteCard";
import CommentCard from "../components/CommentCard";

const SingleSwimSite = () => {
  const { id } = useParams();
  const [swimSite, setSwimSite] = useState([]);
  const [comments, setComments] = useState([]);
  const [createdByArray, setCreatedByArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/swim-sites/${id}/`);
        console.log(data);
        setSwimSite(data);
        setComments(data.comments);
        setCreatedByArray(data.comments[0].created_by);
        console.log(data.comments[0].created_by);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>{swimSite.name}</h1>
      <DetailedSwimSiteCard swimSite={swimSite} />
      <h3>Comments</h3>
      <div className="comments-container">
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
