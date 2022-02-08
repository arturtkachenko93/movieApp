export default class MovieService {
  apiBaseURL = 'https://api.themoviedb.org';

  API_KEY = '40e86315c847965b085c05f40b48e7f7';

  async getResource(url) {
    const res = await fetch(`${this.apiBaseURL}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} received`);
    }

    const resJSON = await res.json();
    return resJSON;
  }

  async getGuestSession() {
    const res = await this.getResource(`/3/authentication/guest_session/new?api_key=${this.API_KEY}`);
    return res;
  }

  async getAllFilms(searchValue, page) {
    const res = await this.getResource(`/3/search/movie?api_key=${this.API_KEY}&query=${searchValue}&page=${page}`);
    return res;
  }

  async setRating(movie, guestId, rate) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie}/rating?api_key=${this.API_KEY}&guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rate }),
    });
    if (!res.ok) {
      throw new Error('Could not fetch POST received');
    }
    return res;
  }

  async getRatedMovies(guestId) {
    const res = await this.getResource(`/3/guest_session/${guestId}/rated/movies?api_key=${this.API_KEY}&language=en-US`);
    return res;
  }

  async getGenresMovies() {
    const res = await this.getResource(`/3/genre/movie/list?api_key=${this.API_KEY}`);
    return res;
  }
}
