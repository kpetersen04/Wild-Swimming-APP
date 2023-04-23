import axios from "axios";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import DetailedSwimSiteCard from "../components/DetailedSwimSiteCard";

const SingleSwimSite = () => {
  const { id } = useParams();
  const [swimSite, setSwimSite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/swim-sites/${id}/`);
        console.log(data);
        setSwimSite(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2> This is a page for a specific swim site.</h2>
      <DetailedSwimSiteCard swimSite={swimSite} />
    </div>
  );
};

export default SingleSwimSite;
