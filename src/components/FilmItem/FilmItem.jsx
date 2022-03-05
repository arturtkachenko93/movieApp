import React from 'react';
import propTypes from 'prop-types';
import Film from '../Film';

function FilmItem({ data, onRate, genres }) {
  return (
    <>
      {
        data.map((film) => (
          <Film
            key={film.id}
            id={film.id}
            title={film.title}
            img={film.poster_path}
            desc={film.overview}
            rate={film.vote_average}
            filmGenre={film.genre_ids}
            genres={genres}
            onRate={onRate}
          />
        ))
      }
    </>
  );
}

FilmItem.defaultProps = {
  data: [],
  genres: [],
  onRate: () => {},
};

FilmItem.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
  genres: propTypes.arrayOf(propTypes.object),
  onRate: propTypes.func,
};

export default FilmItem;
