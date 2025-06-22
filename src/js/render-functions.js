import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

export function createGallery(images) {
    const markup = images
      .map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
          <li class="gallery-item">
            <a href="${largeImageURL}" class="gallery__link">
              <img src="${webformatURL}" alt="${tags}" class="gallery__image" loading="lazy" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
          </li>
        `
      )
      .join('');
  
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  
    // Оновлення SimpleLightbox
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export function smoothScroll() {
  const firstCard = document.querySelector('.gallery .gallery__image');
  if (firstCard) {
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  }
}