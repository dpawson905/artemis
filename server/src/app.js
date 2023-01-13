const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan")

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(logger("combined"));

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/planets',planetsRouter);
app.use('/launches', launchesRouter);

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
