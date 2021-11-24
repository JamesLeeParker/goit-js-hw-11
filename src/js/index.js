// import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImgs from './fetch-img';
import refs from './refs';
import createMarkup from './create-markup';

let page = 1;
let searchingWord = '';
let countItems = 0;
let lightbox = {};

const resetPage = () => (page = 1);

const incrementPage = () => (page += 1);

function renderSerchQuery(imgs) {
  if (imgs.hits.length === 0) {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
  } else {
    countItems = imgs.hits.length;
    Notiflix.Notify.success(`Hooray! We found ${imgs.totalHits} images.`);
    refs.ul.innerHTML = imgs.hits.map(img => createMarkup(img)).join('');
  }
}

function renderImgs(imgs) {
  if (countItems === imgs.totalHits) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

  const markup = imgs.hits.map(img => createMarkup(img)).join('');
  countItems += imgs.hits.length;

  refs.ul.insertAdjacentHTML('beforeend', markup);
}

const onSearchPhoto = async e => {
  e.preventDefault();

  searchingWord = refs.input.value;
  resetPage();
  const imgs = await fetchImgs(searchingWord, page);

  renderSerchQuery(imgs);
  if (imgs.totalHits > 40) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captionalData: 'alt',
    showCounter: 'true',
  });
};

const onLoadMore = e => {
  incrementPage();

  fetchImgs(searchingWord, page).then(imgs => {
    renderImgs(imgs);
    lightbox.refresh();
  });
};

refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.form.addEventListener('submit', onSearchPhoto);
refs.ul.addEventListener('click', lightbox);
