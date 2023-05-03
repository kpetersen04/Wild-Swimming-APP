import axios from "axios";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SwimSiteCard from "../components/SwimSiteCard";

const MyAccount = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/auth/user/${id}`);
        console.log(data);
        setUser(data);
        const favorites = data.favorites;
        setFavorites(favorites);
        setUserName(`${data.first_name} ${data.last_name}`);
        console.log(data.profile_photo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="standard-heading">{userName}</h1>
      <div className="user-bio-container">
        <p className="_bio-text">{user.bio}</p>{" "}
        <img className="_profile-picture" src={user.profile_photo} />
      </div>
      <h2 className="standard-heading">My Favorites</h2>
      <ul className="card-container">
        {favorites.map(({ site, id }) => {
          return (
            <li key={id}>
              <SwimSiteCard
                name={site.name}
                location={site.location}
                image={site.image}
                swimSitesId={site.id}
                isAccountCard={true}
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
