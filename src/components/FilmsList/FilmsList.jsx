import React from 'react';
import propTypes from 'prop-types';
import { Spinner } from '../../lib/Antd';
import Film from '../Film';
import './FilmsList.scss';

function FilmsList({
  Data, spinner, onRate, genres,
}) {
  const classNameList = spinner ? 'films__list--load' : 'films__list';
  const load = spinner ? <Spinner size="large" className="spinner" /> : null;
  const content = !spinner ? <FilmItem Data={Data} onRate={onRate} genres={genres} /> : null;
  return (
    <ul className={classNameList}>
      {load}
      {content}
    </ul>
  );
}

function FilmItem({ Data, onRate, genres }) {
  return (
    <>
      {
        Data.map((film) => (<Film key={film.id} id={film.id} title={film.title} img={film.poster_path} desc={film.overview} rate={film.vote_average} filmGenre={film.genre_ids} genres={genres} onRate={onRate} />))
      }
    </>
  );
}

FilmsList.defaultProps = {
  Data: [],
  genres: [],
  spinner: true,
  onRate: () => {},
};

FilmsList.propTypes = {
  Data: propTypes.arrayOf(propTypes.object),
  genres: propTypes.arrayOf(propTypes.object),
  spinner: propTypes.bool,
  onRate: propTypes.func,
};

FilmItem.defaultProps = {
  Data: [],
  genres: [],
  onRate: () => {},
};

FilmItem.propTypes = {
  Data: propTypes.arrayOf(propTypes.object),
  genres: propTypes.arrayOf(propTypes.object),
  onRate: propTypes.func,
};

export default FilmsList;
