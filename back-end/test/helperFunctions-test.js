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

before(() => {
  getStub = sinon.stub(axios, 'get');
});
after(() => {
  getStub.restore();
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
