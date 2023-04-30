import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DEV_API_URL } from "../consts";
// import SwimSiteCard from "../components/SwimSiteCard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SwimSiteCard from "../components/SwimSiteCard";

const SitesByRegion = () => {
  const { id } = useParams();
  const [swimSites, setSwimSites] = useState();
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/regions/${id}`);
        const region = data.region_name;
        const swimSites = data.swim_sites;
        console.log(swimSites);
        setSwimSites(swimSites);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>This is the region:</h1>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <ul className="card-container">
          {swimSites.map(
            ({
              description,
              id,
              image,
              location,
              name,
              parking_info,
              postcode,
              region,
            }) => {
              return (
                <li key={id}>
                  <SwimSiteCard
                    description={description}
                    swimSitesId={id}
                    image={image}
                    name={name}
                    parkingInfo={parking_info}
                    postcode={postcode}
                    region={region}
                    location={location}
                  />
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};

export default SitesByRegion;
