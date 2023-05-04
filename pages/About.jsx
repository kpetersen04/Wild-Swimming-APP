import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import Swimmer from "../assets/HomePageImage.jpg";
import ManJumping from "../assets/ManJumping.jpg";
import { Link } from "react-router-dom";
import LoadingVisual from "../components/LoadingVisual";

const About = () => {
  const [regions, setRegion] = useState([]);
  const [allSwimSites, setAllSwimSites] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbresponse = await axios.get(`${DEV_API_URL}/regions/`);
        const { data } = await axios.get(`${DEV_API_URL}/swim-sites/`);

        const allSwimSites = data;
        setAllSwimSites(allSwimSites);
        console.log(data);
      } catch (err) {
        setShowError(true);
        setError("Network Error, please try again later.");
        return err;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="about-page-container">
      <img className="_image" src={Swimmer} />
      <h1 className="_page-title">ABOUT</h1>
      <body className="_text-body">
        <h3 className="_heading">What is wild swimming?</h3>
        <p>
          Wild swimming is simply swimming – or taking a dip – in any of
          nature’s watering holes.
        </p>
        <h3>Health benefits of wild swimming</h3>
        <p>
          The health and psychological benefits of swimming in natural waters
          have long been known, as our many spa towns are testament to. Florence
          Nightingale and Charles Dicken both claimed to have been cured by
          these traditional forms of ‘hydrotherapy’. There are quite a few
          different physiological and health effects:
        </p>
        <ul>
          <li className="list-item">
            A one off dunk creates intense vasodilation, enhancing blood flow,
            and bringing fresh blood to the extremities.
          </li>
          <li className="list-item">
            A cold dip also provides a psychological kick start. A powerful
            endorphin shot is released and this natural high brings on intense
            feelings of well being and an addictive urge to dive back in.
          </li>
          <li className="list-item">
            After regular swimming, a process known as cold adaptation kicks in.
            Not only does this reduce your body’s sensation of coldness (making
            even the coldest water quite pleasant), it is clinically proven to
            boost mode, libido and the immune system – as shown in NASA
            experiments from the 1980s.
          </li>
          <li className="list-item">
            Coldwater swimming is also a sure-fire way to burn calories quickly
            and building muscle tone and graceful technique.
          </li>
          <li className="list-item">
            Wild swimming is a very good way to de-stress, and acts like a form
            of mindfulness or meditation, bringing them into the moment,
            focusing their mind on the physical sensations, and taking them away
            from their worries and concerns. In some ways it is the perfect
            digital detox.
          </li>
        </ul>
        <p>
          Wild swimming appeals to a wide range of people, from local teenagers
          who enjoy mucking about in the rivers, to octogenarians who find it
          keeps them healthy and alert. There is also a growing number of city
          dwellers who are discovering the benefits of wild swimming.
        </p>
        <h3>10 ways to be wild and safe when swimming</h3>
        <div className="safe-swimming-container">
          <img className="_image" src={ManJumping} />
          <ol>
            <li>
              Never swim in canals, urban rivers, stagnant lakes or reedy
              shallows.
            </li>
            <li>Never swim in flood water and be cautious of water quality.</li>
            <li>
              If you dive or jump, always check the depth and that the water is
              obstacle free.
            </li>
            <li>
              Blue-green algae is a slippery and potentially dangerous
              substance. Avoid if possible.
            </li>
            <li>
              Never swim alone and keep a constant watch on weak swimmers.
            </li>
            <li>
              Check the current! Check the water's flow first to make sure you
              can make it back upstream.
            </li>
            <li>
              Always make sure you know how you will get out before you get in.
            </li>
            <li>
              Don’t get too cold – warm up with exercise and warm clothes before
              and after a swim.
            </li>
            <li>Wear footwear.</li>
            <li>Watch out for boats on any river.</li>
          </ol>
        </div>
        <h3>Check out some of our favorite swim sites!</h3>
        <p>
          Our community brings together the best wild swimming spots in the
          United Kingdom. Here are a few of the fabulous sites are members have
          found.
        </p>
        {showError ? (
          <>
            <LoadingVisual />
          </>
        ) : (
          <Carousel style={{ width: "100%" }}>
            {allSwimSites.map((site) => (
              <Carousel.Item
                as={Link}
                to={`/swim-sites/${site.id}`}
                key={site.id}
              >
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
        )}
      </body>
    </div>
  );
};

export default About;
