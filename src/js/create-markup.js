export default function createMarkup({
  largeImageURL,
  likes,
  views,
  comments,
  downloads,
  tags,
  webformatURL,
}) {
  return `<li>
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" >
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
  </a>
  </li>`;
}
