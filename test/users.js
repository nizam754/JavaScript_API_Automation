import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");

import { expect } from "chai";

const TOKEN =
  "c02177b60339dcc1d981da685bdfd5a6546606e03d3c158b99d2d686c7fd4e40";

describe("Users", () => {
  it("GET /users", () => {
    /* request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).to.not.be.empty;
            done();
        }); */
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it("GET /users/:id", () => {
    return request.get(`users/1?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data.id).to.not.be.eq(1);
    });
  });

  it("GET /users with query params", () => {
    const url = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`;

    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq("Female");
        expect(data.status).to.eq("Active");
      });
    });
  });
  //API Tests for HTTP POST method
  it("POST /users", () => {
    //it.only use for only this request
    const data = {
      email: `test-${Math.floor(Math.random() * 9999)}@mail.com`,
      name: "test name",
      gender: "Male",
      status: "Inactive",
    };

    return request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        // console.log(res.body);
        // data.gender = "Female";
        expect(res.body.data).to.deep.include(data);
      });
  });
  //API Tests for HTTP PUT method
  it.only("PUT /users/:id", () => {
    const data = {
      status: "Active",
      name: `Salman - ${Math.floor(Math.random() * 9999)}`,
    };

    return request
      .put("users/10")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        //console.log(res.body);
        //console.log(res.body.data);
        expect(res.body.data).to.deep.include(data);
      });
  });
});
