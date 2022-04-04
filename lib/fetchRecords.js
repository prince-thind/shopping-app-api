const axios = require("axios");
const falso = require("@ngneat/falso");
const fetchSingleRecord = require("./fetchSingleRecord");

module.exports = async function fetchRecords(number) {
  let res = [];
  for (let i = 0; i < number; i++) {
    const name = falso.randAccessory();
    const item = fetchSingleRecord(name);
    res.push(item);
  }

  res = await Promise.all(res);
  return res;
};
