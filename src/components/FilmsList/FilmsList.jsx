import React from 'react';
import propTypes from 'prop-types';
import { Spinner } from '../../lib/Antd';
import Film from '../Film';
import './FilmsList.scss';

function FilmsList({ Data, spinner }) {
  const classNameList = spinner ? 'films__list--load' : 'films__list';
  const load = spinner ? <Spinner size="large" className="spinner" /> : null;
  const content = !spinner ? <FilmItem Data={Data} /> : null;

  return (
    <ul className={classNameList}>
      {load}
      {content}
    </ul>
  );
}

function FilmItem({ Data }) {
  return (
    <>
      {
        Data.map((film) => (<Film key={film.id} title={film.title} img={film.poster_path} desc={film.overview} />))
      }
    </>
  );
}

FilmsList.defaultProps = {
  Data: [],
  spinner: true,
};

FilmsList.propTypes = {
  Data: propTypes.arrayOf(propTypes.object),
  spinner: propTypes.bool,
};

FilmItem.defaultProps = {
  Data: [],
};

FilmItem.propTypes = {
  Data: propTypes.arrayOf(propTypes.object),
};

export default FilmsList;
