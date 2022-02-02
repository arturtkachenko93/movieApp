import React, { Component } from 'react';

import MovieService from '../../services/movie-service';
import FilmsList from '../FilmsList';
import {
  AlertMsg, SearchPanel, PaginationPanel, NotFoundAlert,
} from '../../lib/Antd';
import './app.scss';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
    errorNotFound: false,
    search: 'return',
    page: 1,
    totalPages: 81,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.getMovies();
    }

    if (this.state.page !== prevState.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    this.movieService
      .getAllFilms(this.state.search, this.state.page)
      .then((movies) => {
        if (movies.results.length === 0) {
          this.errNotFound();
          return;
        }
        this.setState({
          movies: movies.results,
          totalPages: movies.total_pages,
          loading: false,
          error: false,
          errorNotFound: false,
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  errNotFound = () => {
    console.log('err');
    this.setState({
      errorNotFound: true,
    });
  };

  onSearch = (search) => {
    this.setState({ search, page: 1, loading: true });
  };

  onPage = (page) => {
    this.setState({ page });
  };

  render() {
    const {
      movies, loading, error, errorNotFound, page, totalPages,
    } = this.state;

    const errorMsgNotFound = errorNotFound ? <NotFoundAlert /> : null;
    const errorMsg = error ? <AlertMsg /> : null;
    const content = !error && !errorNotFound ? <FilmsList className="films__list" Data={movies} spinner={loading} error={error} /> : null;

    return (
      <>
        <SearchPanel search={this.onSearch} />
        <section className="films">
          {errorMsgNotFound}
          {errorMsg}
          {content}
        </section>
        <PaginationPanel onPage={this.onPage} totalPages={totalPages} currPage={page} />
      </>
    );
  }
}
