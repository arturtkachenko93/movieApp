import React from 'react';
import PropTypes from 'prop-types';
import Film from '../Film';

import './FilmsList.scss';

function FilmsList({ Data }) {
  const films = Data.map((film) => {
    const {
      id,
      title,
      // eslint-disable-next-line camelcase
      backdrop_path,
      overview,
    } = film;
    return (
      <Film
        key={id}
        title={title}
        // eslint-disable-next-line camelcase
        img={backdrop_path}
        desc={overview}
      />
    );
  });

  return (
    <ul className="films__list">{films}</ul>
  );
}

FilmsList.defaultProps = {
  Data: [],
};

FilmsList.propTypes = {
  Data: PropTypes.arrayOf,
};

export default FilmsList;
