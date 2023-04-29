import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import Carousel from "react-bootstrap/Carousel";
// import SwimSiteCarousel from "../components/Carousel";
// import SwimSiteCard from "../components/SwimSiteCard";

const Home = () => {
  const [regions, setRegion] = useState([]);
  const [allSwimSites, setAllSwimSites] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
        const { data } = await axios.get(`${DEV_API_URL}/swim-sites/`);
        const allSwimSites = data;
        setAllSwimSites(allSwimSites);
        console.log(data);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>This is the home page.</h1>
      <Carousel style={{ width: "75%" }}>
        {allSwimSites.map((site) => (
          <Carousel.Item key={site.id}>
            <img
              className="d-block w-100"
              height="400px"
              src={site.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{site.name}</h3>
              <p>{site.location}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
