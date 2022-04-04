require("dotenv").config();
const fetchRecords = require("./lib/fetchRecords");
const falso = require("@ngneat/falso");

const PORT = process.env.PORT;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  let num = req.query.n ?? 15;
  let name = req.query.name ?? falso.randProductName;

  name = sanitiseName(name);
  num = sanitiseNum(num);

  fetchRecords(name, num)
    .then((response) => {
      res.json({ data: response, error: null });
    })
    .catch((error) => {
      res.json({ data: null, error });
    });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}, visit http://localhost:${PORT}`);
});

function sanitiseName(name) {
  let res = null;

  if (typeof name !== "string") {
    name = "";
  }

  if (name.length > 50) {
    res = name.slice(0, 50);
  }

  return res;
}

function sanitiseNum(input) {
  let num = 1;
  if (typeof input !== "number") {
    input = 1;
  }

  num = Math.round(input);

  // num between 0-50
  num = Math.min(50, input);
  num = Math.max(0, num);
  return num;
}
