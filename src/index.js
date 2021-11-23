import './css/styles.css';

const refs = {
  input: document.querySelector('input'),
  button: document.querySelector('button'),
};

const BASE_URL = 'https://pixabay.com/api/';
const URL_KEY = '24469926-df466a8874aa59a8d5a89b872';
let page = 1;

const fetchImgs = (search = 'cat') => {
  return fetch(
    `${BASE_URL}?key=${URL_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`,
  ).then(resp => resp.json());
};
fetchImgs().then(r => console.log(r));

const onSearchPhoto = e => {
  refs.button.prevenDefault();
  const searchingWord = e.target.value;
  console.log('✈️ ~ searchingWord', searchingWord);
};

refs.button.addEventListener('submit', onSearchPhoto);
