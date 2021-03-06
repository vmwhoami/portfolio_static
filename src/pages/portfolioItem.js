import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { LoopCircleLoading } from 'react-loadingg';
import axios from 'axios';

import { Github, Earth, Back } from '../components/Svgs';
import Heading from '../components/Heading';

const PortfolioItem = () => {
  const { id } = useParams();

  const url = `https://vmportapi.herokuapp.com/portfolio/${id}`;
  const [loading, setLoading] = useState(true);
  const [portitem, setPortItem] = useState([]);

  const getPortItems = async () => {
    const item = await axios.get(url);
    setPortItem(item.data);
    setLoading(false);
  };
  useEffect(() => {
    getPortItems();
  }, []);
  const {
    title, subtitle, body, main_image, github_link, live_link,
  } = portitem;
  return (
    <div className="container">
      <Heading
        white=""
        color={title}
        bg="Portfolio"
      />
      {loading ? <LoopCircleLoading /> : null}
      <div className="portItemCont">
        <ImageOfItem thumb_image={main_image} />
        <div className="content">
          <h3 className="content__h3">
            {subtitle}
            {' '}
          </h3>
          <p>{body}</p>

          <hr className="white-line " />
          <div className="links">
            <LiveLinks github_link={github_link} Github={Github} />
            <LiveLinks live_link={live_link} Earth={Earth} />
            <NavLink className="links__container" to="/portfolio">
              <span className="links__text">back to portfolios</span>
              <i className="links__icon">
                <Back />
              </i>
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

const LiveLinks = ({
  live_link, github_link, Earth, Github,
}) => (
  <a target="_blank" className="links__container" rel="noreferrer" href={live_link || github_link}>
    <span className="links__text">{Earth ? 'Live' : 'Github'}</span>
    <i className="links__icon">
      {Earth ? <Earth /> : <Github />}
    </i>
  </a>
);

const ImageOfItem = ({ thumb_image }) => (
  <div className="imgcontainer">
    <img className="imgcontainer__img " src={thumb_image} />
  </div>
);

export default PortfolioItem;
