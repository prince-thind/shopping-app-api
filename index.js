require("dotenv").config();
const cors=require('cors');
const fetchRecords = require("./lib/fetchRecords");

const PORT = process.env.PORT||8001;

const express = require("express");
const app = express();

app.use(cors({
  origin:process.env.ORIGIN,
}));

app.get("/items.json", (req, res) => {
  let num = req.query.n ?? 15;

  num = sanitiseNum(num);

  fetchRecords(num)
    .then((response) => {
      res.json({ items: response, error: null });
    })
    .catch((error) => {
      res.json({ items: null, error });
      console.log(error)
    });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}, visit http://localhost:${PORT}`);
});


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
