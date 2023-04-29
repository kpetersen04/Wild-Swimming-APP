import axios from "axios";
import { DEV_API_URL } from "../consts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SwimSiteCard from "../components/SwimSiteCard";

const MyAccount = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DEV_API_URL}/auth/user/${id}`);
        console.log(data.favorites);
        const favorites = data.favorites;
        console.log(favorites);
        setFavorites(favorites);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>You've made it to your My Acount page.</p>
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
            ;
          </li>
        );
      })}
    </div>
  );
};

export default MyAccount;
