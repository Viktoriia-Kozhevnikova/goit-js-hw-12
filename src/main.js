import { fetchImages } from "./js/pixabay-api.js";
import { displayImages } from "./js/render-functions.js";
import iziToast from "izitoast";

const form = document.querySelector(".form");
const input = document.querySelector(".search");
const button = document.querySelector(".btn");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;

input.addEventListener("input", checkButtonState);
form.addEventListener("submit", formSubmit);
loadMoreButton.addEventListener("click", loadMoreImages);

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function checkButtonState() {
  button.disabled = input.value.trim() === "";
}

async function formSubmit(event) {
  event.preventDefault();
  query = input.value.trim();

  if (query === "") {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
      timeout: 3000,
      position: "topRight"
    });
    return;
  }

  page = 1; 
  showLoader();
  loadMoreButton.style.display = "none";

  try {
    const data = await fetchImages(query, page, perPage);
    displayImages(data, gallery);
    if (data.hits.length > 0 && data.totalHits > perPage) {
      loadMoreButton.style.display = "block";
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images. Please try again!",
      timeout: 3000,
      position: "topRight"
    });
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  page += 1; 
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    displayImages(data, gallery, true);

    if ((page - 1) * perPage + data.hits.length >= data.totalHits) {
      loadMoreButton.style.display = "none";
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight"
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images. Please try again!",
      position: "topRight"
    });
  } finally {
    hideLoader();
    smoothScroll();
  }
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth"
  });
}

button.disabled = true;