require("dotenv").config();
const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;
const PORT = process.env.PORT || 8000;
const { mongoConnect } = require('./services/mongo');
const app = require("./app");
const http = require("http");
const { loadPlanetsData } = require("./models/planets.model");
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`NASA LC API is on port ${PORT}`);
  });
}

startServer();
