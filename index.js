require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('hello world')
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}, visit http://localhost:${PORT}`);
});
