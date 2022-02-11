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
