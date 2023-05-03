import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import SwimSiteCard from "../components/SwimSiteCard";
import LoadingVisual from "../components/LoadingVisual";

const SitesByRegion = () => {
  const { id } = useParams();
  const [swimSites, setSwimSites] = useState();
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/regions/${id}`);
        console.log(data);
        setRegion(data.region_name);
        const swimSites = data.swim_sites;
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
      <h1 className="standard-heading">{region}</h1>
      {isLoading ? (
        <LoadingVisual />
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
