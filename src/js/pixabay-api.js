import axios from "axios";

const URL = "https://pixabay.com/api/";
const API_KEY = "45141895-b62da3b06f4b18f1184207a2c";

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: perPage 
  };

  try {
    const response = await axios.get(URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}