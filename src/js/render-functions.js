import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let lightbox;

export function displayImages(data, gallery, append = false) {
  if (!append) {
    gallery.innerHTML = "";
  }

  if (data.hits.length === 0) {
    iziToast.error({
      title: "No Results",
      message: "Sorry, there are no images matching your search query. Please try again!",
      timeout: 3000,
      position: "topRight"
    });
    return;
  }

  const markup = data.hits.map(image => {
    return `
      <li class="gallery-item-wrapper">
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" class="img" />
          <div class="container-properties">
            <ul class="list-properties">
              <li class="properties"><p class="text"><strong>Likes</strong> ${image.likes}</p></li>
              <li class="properties"><p class="text"><strong>Views</strong> ${image.views}</p></li>
              <li class="properties"><p class="text"><strong>Comments</strong> ${image.comments}</p></li>
              <li class="properties"><p class="text"><strong>Downloads</strong> ${image.downloads}</p></li>
            </ul>
          </div>
        </a>
      </li>`;
  }).join("");

  gallery.insertAdjacentHTML("beforeend", markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {});
  } else {
    lightbox.refresh();
  }
}