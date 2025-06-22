import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50868712-4e51c6fc19c53f8b926e21bf1';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}