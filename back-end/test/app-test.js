const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../app');
const helpers = require('../helperFunctions');
require('dotenv').config({ silent: true });

const { assert } = chai;
const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

let getTokenStub;
let useAccessTokenStub;

before(() => {
  getTokenStub = sinon.stub(helpers, 'getToken');
  useAccessTokenStub = sinon.stub(helpers, 'useAccessToken');
});
after(() => {
  getTokenStub.restore();
  useAccessTokenStub.restore();
});

describe('GET request to /spotifyconnect route', () => {
  it('it should redirect to spotify login', (done) => {
    chai
      .request(server)
      .get('/spotifyconnect')
      .redirects(0)
      .end((err, res) => {
        res.should.have.status(302);
        done();
      });
  });
});

describe('GET request to /spotifycallback route', () => {
  it('it should respond with an HTTP 302 status code when successful', (done) => {
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
      .redirects(0)
      .end((err, res) => {
        res.should.have.status(302);
        done();
      });
  });
  it('it should redirect with a 401 status code when authentication fails', (done) => {
    chai
      .request(server)
      .get('/spotifycallback')
      .redirects(0)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
