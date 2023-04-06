const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios');
const server = require('../app');
const helpers = require('../helperFunctions');
require('dotenv').config({ silent: true });

const { assert } = chai;
const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

let getTokenStub;
let useAccessTokenStub;
let generateRandomStringStub;

before(() => {
  getTokenStub = sinon.stub(helpers, 'getToken');
  useAccessTokenStub = sinon.stub(helpers, 'useAccessToken');
  generateRandomStringStub = sinon.stub(helpers, 'generateRandomString');
});
after(() => {
  getTokenStub.restore();
  useAccessTokenStub.restore();
  generateRandomStringStub.restore();
});

describe('GET request to /spotifyconnect route', () => {
  it('it should redirect to spotify login', (done) => {
    generateRandomStringStub();
    chai
      .request(server)
      .get('/spotifyconnect')
      .end((err, res) => {
        expect(res).to.redirect;
        // res.should.redirectTo('https://accounts.spotify.com/authorize?');
        // check redirect url
        done();
      });
  });
});

describe('GET request to /spotifycallback route', () => {
  it('it should respond with an HTTP 200 status code and an object in the response body', (done) => {
    const getTokenArgs = [
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'fakeCode',
      process.env.REDIRECT_URI,
    ];
    const getTokenResponse = { access_token: 'fakeToken', refresh_token: 'fakeRefresh' };
    getTokenStub.withArgs(...getTokenArgs).returns(Promise.resolve(getTokenResponse));

    const useAccessTokenArgs = ['https://api.spotify.com/v1/me/top/artists', 'fakeToken'];
    const useAccessTokenResponse = { status: 200, statusText: 'OK', items: '[1, 2, 3]' };
    useAccessTokenStub
      .withArgs(...useAccessTokenArgs)
      .returns(Promise.resolve(useAccessTokenResponse));

    chai
      .request(server)
      .get('/spotifycallback')
      .query({ code: 'fakeCode', state: 'abcd1234' })
      .end((err, res) => {
        // res.should.redirectTo('http://localhost:3001/profile');
        // expect(res).to.redirect;
        done();
      });
  });
  it("it should redirect with an 'authentication' error query", (done) => {
    chai
      .request(server)
      .get('/spotifycallback')
      .end((err, res) => {
        // res.should.have.status(200);
        // expect(res).to.redirect;
        done();
      });
  });
});
