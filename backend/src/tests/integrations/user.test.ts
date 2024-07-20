import request from "supertest";
import { app } from "../../app";

describe("Test example", () => {
  test("Create User/", async () => {
    const response = await request(app)
      .post("/users")
      .set("Accept", "application/json")
      .send({name : "Margareth João", email : "margarethjoão@gmail.com", password : "romeno", confirmationPassword : "romeno"})

    expect(response.body.id).toBe("527da43b-7d8e-4291-b34a-66932efc27c8");
  });
});
