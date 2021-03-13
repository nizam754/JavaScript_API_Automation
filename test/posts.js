require("dotenv").config();
import request from "../config/common";
const faker = require("faker");

import { expect } from "chai";
import { createRandomuser } from "../helper/user_helper";

const TOKEN = process.env.USER_TOKEN;
/* const TOKEN =
  "c02177b60339dcc1d981da685bdfd5a6546606e03d3c158b99d2d686c7fd4e40"; */

describe.only("User Posts", () => {
  let postId, userId;

  before(async () => {
    userId = await createRandomuser();
  });
  it("/posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);

    // console.log(postRes.body);

    expect(postRes.body.data).to.deep.include(data);
    postId = postRes.body.data.id;
  });

  it("GET /posts/:id", async () => {
    await request
      .get("posts/${postId}")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });
});
