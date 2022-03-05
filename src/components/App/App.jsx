import React, { Component } from 'react';

import { Result, Tabs } from 'antd';
import MovieService from '../../services/movie-service';
import FilmsList from '../FilmsList';
import { Provider } from '../../services/context';
import AlertMsg from '../AlertMsg';
import SearchPanel from '../SearchPanel';
import { PaginationPanel, PaginationPanelRated } from '../Pagination';
import 'antd/dist/antd.min.css';
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
    totalPages: 1,
    pageRate: 1,
    totalPagesRate: 1,
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

    if (this.state.pageRate !== prevState.pageRate) {
      this.getRate();
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
      .getRatedMovies(this.state.guestSessionId, this.state.pageRate)
      .then((movies) => {
        this.setState({
          rateMovies: movies.results,
          totalPagesRate: movies.total_pages,
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

  onPageSearch = (page) => {
    this.setState({ page });
  };

  onPageRated = (page) => {
    this.setState({ pageRate: page });
  };

  onTab = (key) => {
    if (key === '1') {
      this.setState({
        activeTab: 'search',
      });
    }
    if (key === '2') {
      this.setState({
        activeTab: 'rated',
        loading: true,
      });
      this.getRate();
    }
  };

  render() {
    const {
      movies, genres, rateMovies, loading, error, errorNotFound, page, totalPages, pageRate, totalPagesRate, activeTab,
    } = this.state;
    const errorMsgNotFound = errorNotFound ? (
      <Result
        title="Введите название фильма"
        subTitle="видимо, что-то пошло не так ..."
      />
    ) : null;
    const errorMsg = error ? <AlertMsg /> : null;
    const content = !error && !errorNotFound
      ? (
        <FilmsList
          className="films__list"
          data={activeTab === 'search' ? movies : rateMovies}
          spinner={loading}
          error={error}
          genres={genres}
          onRate={this.setRate}
        />
      ) : null;
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
            {movies.length ? <PaginationPanel onPage={this.onPageSearch} totalPages={totalPages} currPage={page} /> : null}
          </TabPane>
          <TabPane tab="Rated" key="2">
            <section className="films">
              {content}
            </section>
            {rateMovies.length ? <PaginationPanelRated onPage={this.onPageRated} totalPages={totalPagesRate} currPage={pageRate} /> : null}
          </TabPane>
        </Tabs>
      </Provider>
    );
  }
}
