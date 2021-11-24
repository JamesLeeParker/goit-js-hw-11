export default async function fetchImgs(search, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const URL_KEY = '24469926-df466a8874aa59a8d5a89b872';
  const resp = await fetch(
    `${BASE_URL}?key=${URL_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );

  return resp.json();
}

// const fetchImgs = (search, page) => {
//   return fetch(
//     `${BASE_URL}?key=${URL_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
//   ).then(resp => resp.json());
// };
