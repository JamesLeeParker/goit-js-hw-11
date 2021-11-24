export default function createMarkup({
  previewURL,
  likes,
  views,
  comments,
  downloads,
  tags,
  webformatURL,
}) {
  return `<li>
  <a href="${webformatURL}"><img src="${previewURL}" alt="${tags}" >
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
