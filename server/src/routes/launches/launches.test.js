require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { loadPlanetsData } = require("../../models/planets.model");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
    
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "Space Monkey",
      target: "Kepler-296 A f",
      launchDate: "Jan 4, 2028",
    };
    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "Space Monkey",
      target: "Kepler-296 A f",
      launchDate: "This is not a date",
    };
    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "Space Monkey",
      target: "Kepler-296 A f",
    };
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test("It should catch missing required properties and send a 400 status code", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing required launch properties",
      });
    });
    test("It should catch invalid dates and send a 400 status code", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
