import { constants } from "./constants.js";
import { renderFullInfoBlock } from "./renderFullInfoBlock.js";

export const showTrends = (moviesBlock) => {

  // Заголовок для топа 20 просматриваемых фильмов
  moviesBlock.innerHTML = `<div class="col-12 g-4 text-center">ТОП 20 просматриваемых фильмов за прошедшую неделю</div>`;

  // Отправка запроса на сервер
  fetch(constants.serverTrendsUrl)
    .then(response => response.json())
    .then(result => {
      result.results.forEach(item => {
        // Название фильма или сериала
        const movieName = item.name || item.title,
        // Url для постера, если он есть
              moviePosterUrl = `https://image.tmdb.org/t/p/w400${item.poster_path}`,
        // Дата выхода в прокат
              movieReleaseDate = item.release_date ? item.release_date.split('-')[0] : (item.first_air_date ? item.first_air_date.split('-')[0] : ''),
        // Блок полной информации
              movieInDetail = document.querySelector('.movie-in-detail');

        // Карточка с фильмом
        const movieTrendCard = `<div class="gy-3 movie-trend-card col-4 col-md-3 col-xl-2" data-id="${item.id}" data-type="${item.media_type}">
                                  <div class="movie-trend-card-wrapper">
                                    <img class="movie-trends" src="${item.poster_path ? moviePosterUrl : constants.noposterUrl}" alt="${item.original_title}">
                                    <div class="overlay"></div>
                                    <div class="movie-trend-info">
                                      <span class="movie-trend-release">${movieReleaseDate}</span>
                                      <span class="movie-trend-name">${movieName}</span>
                                    </div>
                                  </div>
                                </div>`;
        // Добавление карточки в общий блок
        moviesBlock.insertAdjacentHTML('beforeend', movieTrendCard);

        // Добавление обработчика событий для каждого фильма
        moviesBlock.querySelector(`div[data-id='${item.id}']`).addEventListener('click', e => {
          renderFullInfoBlock(item.id, item.media_type, movieInDetail);
        });
      })
    })
    .catch(reason => {
      moviesBlock.innerHTML = constants.errorMessage;
      console.warn(`Error: ${reason}`);
    });

}