require("dotenv").config();
const cors = require("cors");
const express = require("express");

const fetchRecords = require("./lib/fetchRecords");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.get("/", (req, res) => {
  let num = req.query.n ?? 15;

  fetchRecords(num)
    .then((response) => {
      res.json({ items: response, error: null });
    })
    .catch((error) => {
      res.json({ items: null, error });
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}, visit http://localhost:${PORT}`);
});
