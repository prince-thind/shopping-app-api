const axios = require("axios");
const falso = require("@ngneat/falso");

const URL = "https://pixabay.com/api/";

module.exports = async function fetchSingleRecord(name) {
  const res = {};

  const response = await axios.get(URL, {
    params: {
      key: process.env.API_KEY,
      q: name,
      per_page: 10,
      safesearch: true,
      image_type: "photo",
    },
  });

  const images = response.data.hits.map((i) => i.webformatURL);

  const src = images[Math.trunc(Math.random() * images.length)];

  res.name = name;
  res.key = falso.randUuid();
  res.price = Math.trunc(Math.random() * 100 + 50);
  res.currency = "USD";
  res.src = src;
  return res;
};
