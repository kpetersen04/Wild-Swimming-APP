import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
// import HomePageImage from "../assests/HomePageImage.jpg";
import { Carousel } from "react-bootstrap";
// import SwimSiteCard from "../components/SwimSiteCard";
import { Card } from "react-bootstrap";

const Home = () => {
  return (
    <div className="homepage-container">
      {/* <img className="_image" src={HomePageImage} /> */}
      <div className="_text-body">
        <p className="_text">
          Welcome to our Wild Swimming Community! We bring all the best wild
          swimming spots in the United Kingdom together in one place.
        </p>
        <p className="_text">
          Create an account to keep track of your favorite spots or feel free to
          just have a look around.
        </p>
        <p>
          If you find somewhere you love or you have some insight on a specific
          site, make sure to leave a comment, so the community can all benefit!
        </p>
      </div>
    </div>
  );
};

export default Home;
