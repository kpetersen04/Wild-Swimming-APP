import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import SwimSiteCard from "../components/SwimSiteCard";
import SwimSiteCarousel from "../components/Carousel";

const Home = () => {
  const [regions, setRegion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
        console.log(dbresponse);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>This is the home page.</h1>
      <SwimSiteCarousel />
    </>
  );
};

export default Home;
