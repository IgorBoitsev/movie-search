import { constants } from "./constants.js";
import { createCard } from './createCard.js';
import { renderFullInfoBlock } from "./renderFullInfoBlock.js";

export const getDataByFetch = (searchInput, moviesBlock) => {

  // Проверка наличия введенных данных
  if (searchInput.value.trim().length === 0) {
    moviesBlock.innerHTML = constants.emptyQuery;
    // Очистка поля ввода
    searchInput.value = '';
    return;
  }
  // Подготовка запроса
  const server = constants.serverUrl + searchInput.value,
        // Блок полной информации
        movieInDetail = document.querySelector('.movie-in-detail');

  let movieGenres = [],
      tvGenres = [];

  // Функция радительного падежа для слова
  const wordInGenetive = (count, word) => {
    if (count % 10 === 1) {
      return word;
    } else if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) {
      return word + 'а';
    } else {
      return word + 'ов';
    }
  }
  
  moviesBlock.innerHTML = constants.loadingSpinner;

  // Составление жанров
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=62a9fa28f3aa19466d1dfd6a82821296&language=ru')
    .then(response => response.json())
    .then(result => movieGenres = result.genres);

  fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=62a9fa28f3aa19466d1dfd6a82821296&language=ru')
    .then(response => response.json())
    .then(result => tvGenres = result.genres);
  

  // Отправка запроса на сервер
    fetch(server)
      .then(response => response.json())
      .then(result => {
        // Предварительная очистка от имеющихся данных и вывод заголовка
        !!result.total_results ? moviesBlock.innerHTML = `<div class="col-12 g-4">По вашему запросу найдено ${result.results.length} ${wordInGenetive(result.results.length, 'результат')}</div>` :  moviesBlock.innerHTML = `<div class="col-12 g-5">По вашему запросу ничего не найдено:(</div>`;
        // Создание и вставка карточек в блок movies
        result.results.forEach(item => {
          // Добавление карточки с фильмом на страницу
          if (item.media_type == 'movie') {
            moviesBlock.insertAdjacentHTML('beforeend', createCard(item, movieGenres));
          } else if (item.media_type == 'tv') {
            moviesBlock.insertAdjacentHTML('beforeend', createCard(item, tvGenres));
          } else  {
            moviesBlock.insertAdjacentHTML('beforeend', createCard(item, []));
          }

          // Добавление обработчика событий для только что добавленной карточки с фильмом
          if (item.media_type !== 'person') {
            moviesBlock.querySelector(`div[data-id='${item.id}']`).addEventListener('click', () => {
              renderFullInfoBlock(item.id, item.media_type, movieInDetail);
            });
          }
  
        })
      })
      .catch(reason => {
        moviesBlock.innerHTML = constants.errorMessage;
        console.warn(`Error: ${reason}`);
      });

  // })();

  // Очистка поля ввода
  searchInput.value = '';

}