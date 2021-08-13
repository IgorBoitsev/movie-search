import { constants } from "./constants.js";

export const renderFullInfoBlock = (id, mediaType, layout) => {

  // Подготовка запроса
  const filmUrl = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=62a9fa28f3aa19466d1dfd6a82821296&language=ru`; 
  
  // Функция создания блока с подробным описанием фильма
  const createFullInfoBlock = (film) => {
    console.log(film);

    const filmPosterUrl = film.poster_path ? `https://image.tmdb.org/t/p/w300${film.poster_path}` : `./img/noposter.png`,
          filmTitle = film.title ? film.title : film.name,
          releaseDate = film.release_date ? film.release_date : film.first_air_date,
          filmReleaseDate = new Date(releaseDate).toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
          });

    // Составление строки с жанрами фильма
    let fimlGenres = '';
    film.genres.forEach(item => {
      fimlGenres = fimlGenres + ', ' + item.name;
    });

    const filmCardDescription = `
      <div class="container py-4">
        <div class="row poster-and-title">
          <div class="col-xl-4 col-lg-4 col-md-5 col-sm-5 col-4">
            <img class="movie-in-detail-poster" src="${filmPosterUrl}" alt="${filmTitle}">
          </div>
          <!-- /.col-5 -->
          <div class="col-xl-5 col-lg-5 col-md-7 col-sm-7 col-8">
            <div class="row">
              <div class="col-6">Название</div>
              <div class="col-6">${filmTitle}</div>
            </div>
            <div class="row">
              <div class="col-6">Оригинальное название</div>
              <div class="col-6">${film.original_title ? film.original_title : film.original_name}</div>
            </div>
            <div class="row">
              <div class="col-6">Дата выхода в прокат</div>
              <div class="col-6">${filmReleaseDate}</div>
            </div>
            <div class="row">
              <div class="col-6">Оригинальный язык</div>
              <div class="col-6">${constants.language[film.original_language]}</div>
            </div>
            <div class="row">
              <div class="col-6">Жанр</div>
              <div class="col-6">${fimlGenres.substring(2)}</div>
            </div>
            <div class="row">
              <div class="col-6">Рейтинг фильма</div>
              <div class="col-6">${film.vote_average}/10</div>
            </div>
            <div class="row">
              <div class="col-6">Длительность</div>
              <div class="col-6">${film.runtime} мин</div>
            </div>
            ${film.budget ? `<div class="row"><div class="col-6">Бюджет фильма</div><div class="col-6">${film.budget} $</div></div>` : ``}
            ${film.homepage ? `<div class="row"><div class="col-6"><a href="${film.homepage}" target="_blank">Официальная страница</a></div></div>` : ``}
          </div>
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 description">${film.overview}</div>
          <!-- /.description -->
        </div>
        <!-- /.poster-and-title -->
      </div>
      <!-- /.container -->
      <button type="button" class="btn-close" aria-label="Close"></button>
      <!-- /.btn-close -->
    `;

    return filmCardDescription;
  }

  // Отправка запроса на сервер
  fetch(filmUrl)
    .then(response => response.json())
    .then(movie => {
      // Вывод информации об этом фильме во всплывающем блоке
      layout.insertAdjacentHTML('afterbegin', createFullInfoBlock(movie));
    })

  layout.style.display = 'block';
  document.body.style.overflow = 'hidden';


  // Кнопка закрытия окна
  layout.addEventListener('click', e => {
    if (e.target.closest('.btn-close')) {
      layout.style.display = 'none';
      layout.innerHTML = '';
      document.body.style.overflow = '';
    }
  })

}