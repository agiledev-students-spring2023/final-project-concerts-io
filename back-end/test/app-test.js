
const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const mongoose = require('mongoose');
const passport = require('passport');

const sandbox = require('sinon').createSandbox();
const server = require('../app');
const helpers = require('../spotifyHelperFunctions');
require('dotenv').config({ silent: true });

const { generateToken } = require('../config/jwt-config');

const { assert } = chai;
const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');

let getTokenStub;
let useAccessTokenStub;
let axiosStub;
let findOneStub;
let execStub;
let saveStub;
let userStub;
let authenticateStub;

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

describe('POST request to /auth/login route', () => {
  beforeEach(() => {
    findOneStub = sandbox.stub(User, 'findOne');
    execStub = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('it should respond with JSON data', (done) => {
    const findOneResponse = {
      exec: execStub,
    };
    const execStubResponse = { username: 'fakeUser' };
    execStubResponse.validPassword = () => true;
    execStubResponse.generateJWT = () => 'fakeToken';
    findOneStub.withArgs({ username: 'fakeUser' }).returns(findOneResponse);
    execStub.resolves(execStubResponse);

    chai
      .request(server)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ username: 'fakeUser', password: 'fakePass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with status code 500 when a user isnt found', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(500);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('POST request to /register route', () => {
  it('it should respond with status 401 when invalid data is posted', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({})
      .end((err, res) => {
        res.should.have.status(401);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('POST request to /edit-profile route', () => {
  it('it should respond with 401 status when no auth token is sent in request', (done) => {
    chai
      .request(server)
      .post('/edit-profile')
      .set('content-type', 'application/json')
      .send({ email: 'testEmail', username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('GET request to /recommended route', () => {
  it('it should respond with 401 status when no auth token is sent in request', (done) => {
    chai
      .request(server)
      .get('/recommended')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('SavedConcertsRoute', () => {
describe('GET request to /SavedConcerts route', () => {
  it('it should respond with a 401 status code when not authenticated', (done) => {
    chai
      .request(server)
      .get('/SavedConcerts')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('FavoriteArtistsRouter', () => {
  describe('GET request to /FavoriteArtists route', () => {
    it('should respond with a 401 status code when not authenticated', (done) => {
      chai
        .request(server)
        .get('/FavoriteArtists')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('TicketMasterRouter', () =>{
  const concertId = 'G5dZZ9Nx_yOzI';
  describe('GET request to /concerts/:id route', () => {
    it('should respond with a 401 status code when not authenticated', (done) => {
      chai
        .request(server)
        .get(`/concerts/${concertId}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('ArtistRouter', () =>{
  const artistId = '6451892f7d9222404ef11259';
  describe('GET request to /artist/:id route', () => {
    it('should respond with a 401 status code when not authenticated', (done) => {
      chai
        .request(server)
        .get(`/artist/${artistId}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
      });
    });
  });
});