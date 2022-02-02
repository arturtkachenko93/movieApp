import React from 'react';
import PropTypes from 'prop-types';
import textClipping from '../../lib/utilits';
import './film.scss';
import Pic from '../../img/test.jpg';

function Film({ title, img, desc }) {
  const imgSrc = img ? `https://image.tmdb.org/t/p/w500${img}` : Pic;
  const text = textClipping(desc);
  return (
    <li className="film__item">
      <img className="film__img" src={imgSrc} alt="Обложка фильма" />
      <div className="film__wrapper">
        <h2 className="film__title">{title}</h2>
        <span className="film__subtitle">March 5, 2020</span>
        <span className="film__category">Action</span>
        <span className="film__category">Drama</span>
        <p className="film__description">{text}</p>
      </div>
    </li>
  );
}

Film.defaultProps = {
  title: 'This is Film!',
  img: Pic,
  desc: 'Description loss ...',
};

Film.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  desc: PropTypes.string,
};

export default Film;
