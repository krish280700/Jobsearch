const express = require("express");
require('dotenv').config()
const cors = require("cors");
const {dbConnect} = require("./lib/db")

const app = express();
const PORT = 8080;
 
app.use(cors());

dbConnect()
app.get("/api/home", (req, res) => {
  res.json({ message: "Like this video!", people: ["Arpan", "Jack", "Barry"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});