import { getDataByFetch } from "./fetch.js";
import { showTrends } from "./showTrends.js";

// document.addEventListener('DOMContentLoaded', () => {
  // Вся форма
  const searchForm = document.querySelector('#search-form');
  // Поле ввода названия фильма или сериала
  const searchText = document.querySelector('.form-control');
  // Блок вывода полученной информации
  const moviesBlock = document.querySelector('#movies');
  // Кнопка сброса данных
  const resetBtn = document.querySelector('#reset');
  // Подложка для подробного описания фильма
  // const movieInDetail = document.querySelector('.movie-in-detail');
  
  // Вывод фильмов в трендах
  showTrends(moviesBlock);
  
  // Сброс выведенных данных
  resetBtn.addEventListener('click', () => {
    moviesBlock.innerHTML = '';
  });
  
  // 
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getDataByFetch(searchText, moviesBlock);
  })

// })