const axios = require("axios");
const falso = require("@ngneat/falso");

const URL = "https://pixabay.com/api/";

module.exports = async function fetchSingleRecord(name, number) {
  const res = {};
  name = sanitiseName(name);

  const response = await axios.get(URL, {
    params: {
      key: process.env.API_KEY,
      q: name,
      per_page: number,
      safesearch: true,
      image_type: "photo",
    },
  });

  const images = response.data.hits.map((i) => i.webformatURL);

  const src = images[Math.trunc(Math.random() * images.length)];

  res.name = name;
  res.key = falso.randUuid();
  res.price = Math.trunc(Math.random() * 100 + 50);
  res.count = 0;
  res.currency = "$";
  res.image = src;
  return res;
};

function sanitiseName(name) {
  let res = name;

  if (typeof name !== "string") {
    res = "";
  }

  if (name.length > 50) {
    res = name.slice(0, 50);
  }

  // res.replaceAll(" ", "+");

  return res;
}
