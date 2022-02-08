export function textClipping(str) {
  return `${str.replace(/^(.{70}[^\s]*).*/, '$1')} ...`;
}

export function addRatingLocalStorage(id) {
  const ratingInStorage = JSON.parse(JSON.stringify(localStorage));
  let rating;
  for (const key in ratingInStorage) {
    if (id === +key) {
      rating = +ratingInStorage[key];
    }
  }
  return rating;
}

export function getGenreMovies(data, genres) {
  const genresList = [];
  data.forEach((film) => {
    genres.forEach((genre) => {
      film.genre_ids.forEach((genreData) => {
        if (genreData === genre.id) {
          console.log(genreData);
        }
      });
    });
  });

  return genresList;
}
