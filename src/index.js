import './css/styles.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  ul: document.querySelector('.photos__list'),
  loadMoreBtn: document.querySelector('.btn'),
};

const BASE_URL = 'https://pixabay.com/api/';
const URL_KEY = '24469926-df466a8874aa59a8d5a89b872';
let page = 1;
let searchingWord = '';
let countItems = 0;

const fetchImgs = (search = 'cat', page) => {
  return fetch(
    `${BASE_URL}?key=${URL_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${page}`,
  ).then(resp => resp.json());
};

const createMarkup = ({ previewURL, likes, views, comments, downloads, tags }) => {
  return `<li>
  <img src="${previewURL}" alt="${tags}" >
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
  
  </li>`;
};

function renderSetchQuery(imgs) {
  countItems = imgs.hits.length;

  refs.ul.innerHTML = imgs.hits.map(img => createMarkup(img)).join('');
}

function renderImgs(imgs) {
  if ((countItems = imgs.totalHits)) refs.loadMoreBtn.classList.add('is-hidden');
  const markup = imgs.hits.map(img => createMarkup(img)).join('');
  countItems += imgs.hits.length;

  refs.ul.insertAdjacentHTML('beforeend', markup);
}

const onSearchPhoto = e => {
  e.preventDefault();

  searchingWord = refs.input.value;
  resetPage();
  fetchImgs(searchingWord, page).then(imgs => {
    renderSetchQuery(imgs);

    refs.loadMoreBtn.classList.remove('is-hidden');
  });
};

const resetPage = () => (page = 1);

const incrementPage = () => (page += 1);

refs.form.addEventListener('submit', onSearchPhoto);

const onLoadMore = e => {
  incrementPage();

  fetchImgs(searchingWord, page).then(imgs => renderImgs(imgs));
};

refs.loadMoreBtn.addEventListener('click', onLoadMore);
