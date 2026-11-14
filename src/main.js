// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

console.log('Шаблон готовий. Можна писати код 🚀');

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";

import "./css/styles.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const query = form.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter a search word!",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        message: "Something went wrong. Please try again!",
        position: "topRight",
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});
