const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios');
const helpers = require('../helperFunctions');

const { assert } = chai;
const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

let getStub;
let postStub;

before(() => {
  getStub = sinon.stub(axios, 'get');
  postStub = sinon.stub(axios, 'post');
});
after(() => {
  getStub.restore();
  postStub.restore();
});

describe('generateRandomString', () => {
  it('returns a random string of the desired length', () => {
    const random = helpers.generateRandomString(5);
    random.should.be.a('string');
    random.should.have.lengthOf(5);
  });
  it('returns an empty string when called with a NaN', () => {
    const random = helpers.generateRandomString(NaN);
    random.should.be.a('string');
    random.should.have.lengthOf(0);
  });
});

describe('getToken', () => {
  it('returns the data from the response if successful', async () => {
    const stubData = {
      grant_type: 'authorization_code',
      code: 'fakeCode',
      redirect_uri: 'fakeRedirect',
    };
    const stubArgs = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`fakeID:fakeSecret`).toString('base64')}`,
      },
    };
    const stubResponse = { status: 200, statusText: 'OK', data: '[1, 2, 3]' };
    postStub
      .withArgs('https://accounts.spotify.com/api/token', stubData, stubArgs)
      .returns(Promise.resolve(stubResponse));
    const data = await helpers.getToken('fakeID', 'fakeSecret', 'fakeCode', 'fakeRedirect');
    data.should.equal('[1, 2, 3]');
  });

  it('returns "error" if the response status code is not 200', async () => {
    const stubData = {
      grant_type: 'authorization_code',
      code: 'fakeCode',
      redirect_uri: 'fakeRedirect',
    };
    const stubArgs = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`fakeID:fakeSecret`).toString('base64')}`,
      },
    };
    const stubResponse = { status: 404, statusText: 'Not Found' };
    postStub
      .withArgs('https://accounts.spotify.com/api/token', stubData, stubArgs)
      .returns(Promise.resolve(stubResponse));
    const data = await helpers.getToken('fakeID', 'fakeSecret', 'fakeCode', 'fakeRedirect');
    data.should.equal('error');
  });
});

describe('getTokenWithRefresh', () => {
  it('returns the data from the response if successful', async () => {
    const stubData = {
      grant_type: 'refresh_token',
      refresh_token: 'fakeRefresh',
    };
    const stubArgs = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`fakeID:fakeSecret`).toString('base64')}`,
      },
    };
    const stubResponse = { status: 200, statusText: 'OK', data: '[1, 2, 3]' };
    postStub
      .withArgs('https://accounts.spotify.com/api/token', stubData, stubArgs)
      .returns(Promise.resolve(stubResponse));
    const data = await helpers.getTokenWithRefresh('fakeID', 'fakeSecret', 'fakeRefresh');
    data.should.equal('[1, 2, 3]');
  });

  it('returns "error" if the response status code is not 200', async () => {
    const stubData = {
      grant_type: 'refresh_token',
      refresh_token: 'fakeRefresh',
    };
    const stubArgs = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`fakeID:fakeSecret`).toString('base64')}`,
      },
    };
    const stubResponse = { status: 404, statusText: 'Not Found' };
    postStub
      .withArgs('https://accounts.spotify.com/api/token', stubData, stubArgs)
      .returns(Promise.resolve(stubResponse));
    const data = await helpers.getTokenWithRefresh('fakeID', 'fakeSecret', 'fakeRefresh');
    data.should.equal('error');
  });
});

describe('useAccessToken', () => {
  it('returns the data from the response if successful', async () => {
    const stubArgs = {
      headers: { Authorization: 'Bearer 123' },
    };
    const stubResponse = { status: 200, statusText: 'OK', data: '[1, 2, 3]' };
    getStub.withArgs('/test', stubArgs).returns(Promise.resolve(stubResponse));
    const data = await helpers.useAccessToken('/test', '123');
    data.should.equal('[1, 2, 3]');
  });
  it('returns "error" if response status code is not 200', async () => {
    const stubArgs = {
      headers: { Authorization: 'Bearer 123' },
    };
    const stubResponse = { status: 404, statusText: 'Not Found' };
    getStub.withArgs('/test', stubArgs).returns(Promise.resolve(stubResponse));
    const data = await helpers.useAccessToken('/test', '123');
    data.should.equal('error');
  });
});
