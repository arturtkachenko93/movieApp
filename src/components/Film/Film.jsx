import React from 'react';
import PropTypes from 'prop-types';
import { textClipping } from '../../lib/utilits';
import { Consumer } from '../../services/context';
import './film.scss';
import Pic from '../../img/test.jpg';
import { StarRate } from '../../lib/Antd';

function Film({
  id,
  title, img, desc, rate, onRate, filmGenre,
}) {
  const imgSrc = img ? `https://image.tmdb.org/t/p/w500${img}` : Pic;
  const text = textClipping(desc);

  let classNameRate;
  if (rate < 3) {
    classNameRate = 'film__rate--rate-red';
  } else if (rate > 3 && rate < 5) {
    classNameRate = 'film__rate--rate-orange';
  } else if (rate > 5 && rate < 7) {
    classNameRate = 'film__rate--rate-yellow';
  } else if (rate >= 7) {
    classNameRate = 'film__rate--rate-green';
  }

  return (
    <Consumer>
      {({ genres }) => {
        const filmGenres = genres.reduce((acc, genre) => {
          for (const i of filmGenre) {
            if (i === genre.id) {
              acc.push(genre.name);
            }
          }
          return acc;
        }, []);
        const category = filmGenres.map((genre) => (
          <span className="film__category" key={genre}>
            {genre}
          </span>
        ));

        return (
          <li className="film__item">
            <img className="film__img" src={imgSrc} alt="Обложка фильма" />
            <div className="film__wrapper">
              <div className="film__wrapper-title">
                <h2 className="film__title">{title}</h2>
                <span className={`film__rate ${classNameRate}`}>{rate}</span>
              </div>
              <span className="film__subtitle">March 5, 2020</span>
              <div>
                {category}
              </div>
              <p className="film__description">{text}</p>
              <StarRate onRate={onRate} id={id} rating={0} />
            </div>
          </li>
        );
      }}
    </Consumer>
  );
}

Film.defaultProps = {
  id: 1488,
  title: 'This is Film!',
  img: Pic,
  desc: 'Description loss ...',
  rate: 0,
  filmGenre: [],
  onRate: () => {},
};

Film.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  img: PropTypes.string,
  desc: PropTypes.string,
  rate: PropTypes.number,
  filmGenre: PropTypes.arrayOf(PropTypes.number),
  onRate: PropTypes.func,
};

export default Film;
