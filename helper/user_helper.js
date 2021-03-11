import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "c02177b60339dcc1d981da685bdfd5a6546606e03d3c158b99d2d686c7fd4e40";

export const createRandomuser = async () => {
  const userData = {
    email: `test-${Math.floor(Math.random() * 9999)}@mail.com`,
    name: "test name",
    gender: "Male",
    status: "Inactive",
  };
  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return res.body.data.id;
};
