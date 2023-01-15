const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(logger("combined"));

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

// This is in api.js
app.use("/v1", api);

// Static Html
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
