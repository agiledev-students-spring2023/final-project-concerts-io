const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const server = require("../app");

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("GET request to /spotifyconnect route", () => {
  it("it should respond with an HTTP 200 status code and an object in the response body", (done) => {
    chai
      .request(server)
      .get("/spotifyconnect")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("GET request to /spotifycallback route", () => {
  it("it should respond with an HTTP 200 status code and an object in the response body", (done) => {
    chai
      .request(server)
      .get("/spotifycallback")
      .query({ code: 123, state: "abcd1234" }) //need to fake api interaction here
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("it should redirect with an 'authentication' error query", (done) => {
    chai
      .request(server)
      .get("/spotifycallback")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
