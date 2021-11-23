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

const fetchImgs = (search = 'cat', page) => {
  return fetch(
    `${BASE_URL}?key=${URL_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`,
  ).then(resp => resp.json());
};
// fetchImgs().then(r => console.log(r));

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

const renderImgs = imgs => {
  console.log('✈️ ~ imgs', imgs);

  const markup = imgs.hits.map(img => createMarkup(img)).join('');

  refs.ul.innerHTML = markup;
};

const onSearchPhoto = e => {
  e.preventDefault();
  let page = 1;
  const searchingWord = refs.input.value;

  fetchImgs(searchingWord, page).then(imgs => {
    renderImgs(imgs);
  });
};

refs.form.addEventListener('submit', onSearchPhoto);
