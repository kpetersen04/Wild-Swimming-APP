import axios from "axios";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SwimSiteCard from "../components/SwimSiteCard";
import LoadingVisual from "../components/LoadingVisual";
import { faces } from "@cloudinary/url-gen/qualifiers/region";

const MyAccount = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/auth/user/${id}/`);
        setUser(data);
        const favorites = data.favorites;
        setShowError(false);
        setIsLoading(false);
        setFavorites(favorites);
        setUserName(`${data.first_name} ${data.last_name}`);
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
      {showError && <p className="error-response">{error}</p>}
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <>
          <h1 className="standard-heading">{userName}</h1>
          <div className="user-bio-container">
            <p className="_bio-text">{user.bio}</p>{" "}
            <img className="_profile-picture" src={user.profile_photo} />
          </div>
        </>
      )}
      <h2 className="standard-heading">My Favorites</h2>
      {showError && <p className="error-response">{error}</p>}

      <ul className="card-container">
        {favorites.map(({ site, id, created_by }) => {
          return (
            <li key={id}>
              <SwimSiteCard
                name={site.name}
                location={site.location}
                image={site.image}
                swimSitesId={site.id}
                isAccountCard={parseInt(created_by.id) === parseInt(userId)}
                favoriteId={id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyAccount;
