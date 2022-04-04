const axios = require("axios");
const URL = "https://pixabay.com/api/";

module.exports = async function fetchRecords(name, number) {
  const res = await axios.get(URL, {
    params: {
      key: process.env.API_KEY,
      q: name,
      per_page: number,
      safesearch: true,
      image_type: "photo",
    },
  });
  const images = res.data.hits.map((i) => i.webformatURL);
  return images;
};
