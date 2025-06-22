import { getImagesByQuery } from './js/pixabay-api.js';;
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearGallery();
  hideLoadMoreButton();
  currentQuery = form.elements['search-text'].value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.warning({ message: 'Введіть пошуковий запит.' });
    return;
  }

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'Нічого не знайдено. Спробуйте інше слово.' });
      return;
    }

    createGallery(data.hits);
    if (totalHits > 15) showLoadMoreButton();
  } catch (err) {
    iziToast.error({ message: 'Сталася помилка під час запиту.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    smoothScroll();

    const loadedImages = currentPage * 15;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.error({ message: 'Не вдалося отримати наступні зображення.' });
  } finally {
    hideLoader();
  }
});
