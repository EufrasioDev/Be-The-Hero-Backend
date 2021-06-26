const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    console.log("Before");
});

describe("ONG", () => {
  test("Should be able to create a new ONG", async () => {
    const response = await request(app)
    .post("/ongs")
    .send({
      name: "ANGOLA",
      email: "angola@gmail.com",
      whatsapp: "946955433",
      city: "Portugal",
      uf: "PT"
    })
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(18);
    console.log("ONG");
  });
});

describe("INCIDENTS", () => {  
  test("Should be able create a new INCIDENT", async () => {
    const response  = await request(app).get("/ongs")
    const [{id}] = response.body;
    await request(app)
    .post("/incidents")
    .set("authorization", id)
    .send({
      title: "Cadelinha atropelada 2",
      description: "Uma cadela foi atropelada como teste",
      value: "900"
    })
    console.log("incidents");
  });

  test("Should be able delete a INCIDENT", async () => {
    const response  = await request(app).get("/ongs")
    const [{ id }] = response.body;
    await request(app)
    .delete(`/incidents/${1}`)
    .set("authorization", id)
    const result = await request(app).get("/incidents")
    console.log(result);
  });

});

afterAll(async () => {
    await connection.destroy();
    console.log("FINAL");
});