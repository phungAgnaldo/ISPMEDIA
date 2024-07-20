import request from "supertest";
import { app } from "../../app";

describe("Test example", () => {
  test("GET /", async () => {
    const response = await request(app)
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
