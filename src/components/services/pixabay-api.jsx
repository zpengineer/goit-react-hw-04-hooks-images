const axios = require('axios');
const API_KEY = '25409295-3fe7f980d3353c85bb9c47a25';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

async function pixabayApi(query, page) {
  return await axios.get(
    `${BASE_URL}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
}

export default pixabayApi;
