import { constants } from "./constants.js";

// Функия создания карточки с фильмом
export const createCard = (movie, genres) => {

  // Название фильма
  const movieName = movie.name || movie.title,
        moviePosterUrl = `https://image.tmdb.org/t/p/w400${movie.poster_path}`,
        movieReleaseDate = movie.release_date ? movie.release_date.split('-')[0] : (movie.first_air_date ? movie.first_air_date.split('-')[0] : '----');

  let card = '',
      genreName = '';

  // Создание и вставка карточки с фильмом
  const createMovieCard = () => {
    if (movie.genre_ids) {
      genres.forEach(element => {
        if (element.id == movie.genre_ids[0]) {
          genreName = element.name.split(' ')[0];
        }
      });
    }
    card = `<div class="movie-card col-4 col-md-4 col-lg-3 col-xl-2" data-id="${movie.id}" data-type="${movie.media_type}">
              <img class="movie-poster" src="${movie.poster_path ? moviePosterUrl : constants.noposterUrl}" alt="${movie.original_title}">
              <h6 class="movie-title">${movieName}</h6>
              <div class="popup-label">
                <span class=""release-date>${movieReleaseDate}</span>
                <span class="genre">${genreName}</span>
              </div>
              <!-- /.popup-label -->
            </div>
            <!-- /.movie-card -->`;
  }
  // Создание и вставка карточки с актером или актрисой
  const createPersonCard = () => {
    card = `<div class="person-card col-4 col-md-4 col-lg-3 col-xl-2" data-id="${movie.id}" data-type="${movie.media_type}">
              <img class="movie-poster" src="${constants.nophotoUrl}" alt="${movieName}">
              <h6 class="movie-title">${movieName}</h6>
            </div>
            <!-- /.movie-card -->`;
  }

  if (movie.media_type == 'person') {
    createPersonCard();
  } else {
    createMovieCard();
  }

  return card;

}