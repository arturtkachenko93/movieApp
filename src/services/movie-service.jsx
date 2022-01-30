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

  async getAllFilms(searchValue) {
    const res = await this.getResource(`/3/search/movie?api_key=${this.API_KEY}&query=${searchValue}`);
    return res.results;
  }
}
