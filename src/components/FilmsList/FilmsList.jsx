import React from 'react';
import propTypes from 'prop-types';
import { Spin } from 'antd';
import FilmItem from '../FilmItem';
import './FilmsList.scss';
import 'antd/dist/antd.min.css';

function FilmsList({
  data, spinner, onRate, genres,
}) {
  const classNameList = spinner ? 'films__list--load' : 'films__list';
  const load = spinner ? <Spin size="large" className="spinner" /> : null;
  const content = !spinner ? <FilmItem data={data} onRate={onRate} genres={genres} /> : null;
  return (
    <ul className={classNameList}>
      {load}
      {content}
    </ul>
  );
}

FilmsList.defaultProps = {
  data: [],
  genres: [],
  spinner: true,
  onRate: () => {},
};

FilmsList.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
  genres: propTypes.arrayOf(propTypes.object),
  spinner: propTypes.bool,
  onRate: propTypes.func,
};

export default FilmsList;
