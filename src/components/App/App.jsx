import React, { Component } from 'react';

import { Tabs } from 'antd';
import MovieService from '../../services/movie-service';
import FilmsList from '../FilmsList';
import { Provider } from '../../services/context';
import 'antd/dist/antd.css';

import {
  AlertMsg, SearchPanel, PaginationPanel, NotFoundAlert,
} from '../../lib/Antd';
import './app.scss';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    genres: [],
    rateMovies: [],
    guestSessionId: null,
    loading: false,
    error: false,
    errorNotFound: false,
    search: '',
    page: 1,
    totalPages: 81,
    activeTab: 'search',
  };

  componentDidMount() {
    this.guestSession();
    this.movieService.getGenresMovies()
      .then(({ genres }) => {
        this.setState({
          genres,
        });
      });
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

  guestSession = () => {
    this.movieService
      .getGuestSession()
      .then((res) => {
        this.setState({
          guestSessionId: res.guest_session_id,
        });
      });
  };

  setRate = (rate, id) => {
    localStorage.setItem(id, rate);
    this.movieService
      .setRating(id, this.state.guestSessionId, rate)
      .catch(this.onError);
  };

  getRate = () => {
    this.movieService
      .getRatedMovies(this.state.guestSessionId)
      .then((movies) => {
        this.setState({
          rateMovies: movies.results,
          totalPages: movies.total_pages,
          activeTab: 'rated',
          loading: false,
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

  onTab = (key) => {
    if (key === '1') {
      this.setState({
        activeTab: 'search',
      });
    }
    if (key === '2') {
      this.getRate();
      this.setState({
        loading: true,
      });
    }
  };

  render() {
    const {
      movies, genres, rateMovies, loading, error, errorNotFound, page, totalPages, activeTab,
    } = this.state;
    const errorMsgNotFound = errorNotFound ? <NotFoundAlert /> : null;
    const errorMsg = error ? <AlertMsg /> : null;
    const content = !error && !errorNotFound ? <FilmsList className="films__list" Data={activeTab === 'search' ? movies : rateMovies} spinner={loading} error={error} genres={genres} onRate={this.setRate} /> : null;
    const { TabPane } = Tabs;

    return (
      <Provider value={{ genres }}>
        <Tabs className="tabs" defaultActiveKey="1" onChange={this.onTab} centered>
          <TabPane tab="Search" key="1">
            <SearchPanel search={this.onSearch} />
            <section className="films">
              {errorMsgNotFound}
              {errorMsg}
              {content}
            </section>
            {movies.length ? <PaginationPanel onPage={this.onPage} totalPages={totalPages} currPage={page} /> : null}
          </TabPane>
          <TabPane tab="Rated" key="2">
            <section className="films">
              {content}
            </section>
            {rateMovies.length ? <PaginationPanel onPage={this.onPage} totalPages={totalPages} currPage={page} /> : null}
          </TabPane>
        </Tabs>
      </Provider>
    );
  }
}
