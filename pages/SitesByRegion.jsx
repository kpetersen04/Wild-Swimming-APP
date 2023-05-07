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
  const [regionDescription, setRegionDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/regions/${id}/`);
        setRegion(data.region_name);
        setRegionDescription(data.description);
        const swimSites = data.swim_sites;
        setSwimSites(swimSites);
        setIsLoading(false);
        setShowError(false);
      } catch (err) {
        setIsLoading(false);
        setShowError(true);
        setError("Network Error, please try again later.");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="standard-heading">{region}</h1>
      <p className="region-description">{regionDescription}</p>
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
