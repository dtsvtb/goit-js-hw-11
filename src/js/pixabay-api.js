
import axios from "axios";

const API_KEY = "32302576-166aafe280ac551aefb7aba57";

const BASE_URL = "https://pixabay.com/api/";

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    })
    .then(response => response.data);
}
