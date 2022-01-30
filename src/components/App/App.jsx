import React, { Component } from 'react';
import MovieService from '../../services/movie-service';
import FilmsList from '../FilmsList';

import './app.scss';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
  };

  componentDidMount() {
    this.movieService
      .getAllFilms('Harry')
      .then((res) => {
        this.setState({
          movies: res,
        });
      });
  }

  render() {
    const { movies } = this.state;
    return (
      <section className="films">
        <FilmsList className="films__list" Data={movies} />
      </section>
    );
  }
}
