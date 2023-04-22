import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";

const Home = () => {
  const [regions, setRegion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const dbresponse = await axios.get("http://127.0.0.1:8000/regions/");
        const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
        console.log(dbresponse);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

  return <h1>This is the home page.</h1>;
};

export default Home;
