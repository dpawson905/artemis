require("dotenv").config();
const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;
const PORT = process.env.PORT || 8000;
const { MONGO_URL } = process.env;
const app = require("./app");

const http = require("http");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
 
mongoose.connection.on("error", (err) => {
  console.error("We have error: " + err);
});

async function startServer() {
  mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`NASA LC API is on port ${PORT}`);
  });
}

startServer();
