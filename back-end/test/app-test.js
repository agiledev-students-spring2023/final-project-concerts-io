const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const mongoose = require('mongoose');
const passport = require('passport');

// const sinon = require('sinon');
const sandbox = require('sinon').createSandbox();
const server = require('../app');
const helpers = require('../spotifyHelperFunctions');
require('dotenv').config({ silent: true });

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

/*

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
  beforeEach(() => {
    getTokenStub = sandbox.stub(helpers, 'getToken');
    useAccessTokenStub = sandbox.stub(helpers, 'useAccessToken');
  });
  afterEach(() => {
    sandbox.restore();
  });

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

/*
describe('POST request to /login route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('it should respond with JSON data', (done) => {
    const stubArgs = {
      headers: { 'X-API-Key': process.env.USERS_API_KEY, Accept: 'application/json' },
    };
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: { username: 'testUser', password: 'testPass' },
    };
    axiosStub
      .withArgs('https://my.api.mockaroo.com/users.json', stubArgs)
      .returns(Promise.resolve(stubResponse));

    chai
      .request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with backup JSON data when an error occurs', (done) => {
    const stubArgs = {
      headers: { 'X-API-Key': process.env.USERS_API_KEY, Accept: 'application/json' },
    };
    axiosStub.withArgs('https://my.api.mockaroo.com/users.json', stubArgs).throws(new TypeError());

    chai
      .request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('POST request to /register route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('it should respond with JSON data', (done) => {
    const stubArgs = {
      headers: { 'X-API-Key': process.env.USERS_API_KEY, Accept: 'application/json' },
    };
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: { email: 'testEmail', username: 'testUser', password: 'testPass' },
    };
    axiosStub
      .withArgs('https://my.api.mockaroo.com/users.json', stubArgs)
      .returns(Promise.resolve(stubResponse));

    chai
      .request(server)
      .post('/register')
      .set('content-type', 'application/json')
      .send({ email: 'testEmail', username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with backup JSON data when an error occurs', (done) => {
    const stubArgs = {
      headers: { 'X-API-Key': process.env.USERS_API_KEY, Accept: 'application/json' },
    };
    axiosStub.withArgs('https://my.api.mockaroo.com/users.json', stubArgs).throws(new TypeError());

    chai
      .request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('POST request to /edit-profile route', () => {
  it('it should respond with JSON data', (done) => {
    chai
      .request(server)
      .post('/edit-profile')
      .set('content-type', 'application/json')
      .send({ email: 'testEmail', username: 'testUser', password: 'testPass' })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});


describe('GET request to /recommended route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('it should respond with JSON data', (done) => {
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: [
        { id: 1, artist: 'fakeArtist1' },
        { id: 2, artist: 'fakeArtist2' },
      ],
    };
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/concerts.json?key=${process.env.CONCERTS_API_KEY}`)
      .returns(Promise.resolve(stubResponse));

    chai
      .request(server)
      .get('/recommended')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with backup JSON data when an error occurs', (done) => {
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/concerts.json?key=${process.env.CONCERTS_API_KEY}`)
      .throws(new TypeError());

    chai
      .request(server)
      .get('/recommended')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('GET request to /artist/:id route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('it should respond with JSON data of a single artist', (done) => {
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: [{ id: 1, artist: 'fakeArtist1' }],
    };
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/artists/1.json?key=${process.env.ARTISTS_API_KEY}`)
      .returns(Promise.resolve(stubResponse));
    // using 1 as placeholder id
    chai
      .request(server)
      .get('/artist/1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with backup JSON data when an error occurs', (done) => {
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/artists/1.json?key=${process.env.ARTISTS_API_KEY}`)
      .throws(new TypeError());
    // using 1 as placeholder id
    chai
      .request(server)
      .get('/artist/1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('GET request to /concert/:id route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('it should respond with JSON data of a single concert', (done) => {
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: [
        {
          id: 1,
          name: 'John Smith live at the Purple Lounge',
          artist: 'John Smith',
          date: 'September 22, 2040',
          description: 'John Smith debuts his new record for the first time live',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          ticketLink: 'https://example.com/tickets',
        },
      ],
    };
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/concerts/1.json?key=${process.env.CONCERTS_API_KEY}`)
      .returns(Promise.resolve(stubResponse));
    // using 1 as placeholder id
    chai
      .request(server)
      .get('/concert/1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('it should respond with backup JSON data when an error occurs', (done) => {
    axiosStub
      .withArgs(`https://my.api.mockaroo.com/concerts/1.json?key=${process.env.CONCErTS_API_KEY}`)
      .throws(new TypeError());
    // using 1 as placeholder id
    chai
      .request(server)
      .get('/concert/1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('GET request to /ticketmaster/:id route', () => {
  beforeEach(() => {
    axiosStub = sandbox.stub(axios, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('it should respond with JSON data of a single concert chosen by ID', (done) => {
    const stubResponse = {
      status: 200,
      statusText: 'OK',
      data: [
        {
          _links: {},
          page: {},
        },
      ],
    };
    const testID = {
      id: 'G5viZ9NXGTe24',
    };

    axiosStub
      .withArgs(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&id=${testID.id}`
      )
      .returns(Promise.resolve(stubResponse));
    // using G5viZ9NXGTe24 as placeholder id
    chai
      .request(server)
      .get(`/ticketmaster/${testID.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
/*
describe('GET request to /SavedConcerts route', () => {
  let user;
  let token;

  let userCounter = 1;

  beforeEach(async () => {
    user = new User({
      username: `testUser${userCounter}`,
      email: `testEmail${userCounter}@example.com`,
      password: 'testPassword',
      location: 'test',
    });
    await user.save();

    token = user.generateJWT();
    userCounter += 1;
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({});
    }
  });

  it('it should respond with JSON data of saved concerts', (done) => {
    chai
      .request(server)
      .get('/SavedConcerts')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

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
  let user;
  let token;

  let userCounter = 1;

  beforeEach(async () => {
    user = new User({
      username: `testUser${userCounter}`,
      email: `testEmail${userCounter}@example.com`,
      password: 'testPassword',
      location: 'test',
      favoriteArtists: [],
    });
    await user.save();

    token = user.generateJWT();
    userCounter += 1;
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({});
    }
  });

  describe('GET request to /FavoriteArtists route', () => {
    it('should respond with JSON data of favorite artists', (done) => {
      chai
        .request(server)
        .get('/FavoriteArtists')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it('should respond with a 401 status code when not authenticated', (done) => {
      chai
        .request(server)
        .get('/FavoriteArtists')
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(401);
          done();
        });
    });
  });
});
*/

describe('TicketMasterRouter', () =>{
    const concertId = 'G5dZZ9Nx_yOzI';
    let user;
    let token;

    let userCounter = 1;

    beforeEach(async ()  => {
      user = new User({
        username: `testUser${userCounter}`,
        email: `testEmail${userCounter}@example.com`,
        password: 'testPassword',
        location: 'test',
        favoriteArtists: [],
      });
      await user.save();

      token = user.generateJWT();
      userCounter += 1;

      axiosStub = sandbox.stub(axios, 'get');
    });

    afterEach(async() => {
      if (mongoose.connection.readyState === 1) {
        await User.deleteMany({});
      }
      sandbox.restore();
    });

    describe('GET request to /concerts/:id route', () => {
      it('should respond with JSON data of a single concert', (done) => {
        const stubResponse = {
          status: 200,
          statusText: 'OK',
          data: {
            _embedded: {
              events: [{
                id: concertId,
                name: 'testConcert',
                dates: {
                  start: {
                    localDate: '2023-05-01',
                  },
                },
                info: 'test description',
                _embedded: {
                  venues: [{
                    city: {
                      name: 'testCity',
                    },
                  }],
                },
                images: [{
                  url: 'https://test.com/image.jpg',
                }],
                url: 'https://test.com/tickets',
              }],
            },
          },
        };

        axiosStub
          .withArgs(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&id=${concertId}`)
          .returns(Promise.resolve(stubResponse));

          chai
          .request(server)
          .get(`/concerts/${concertId}`)
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res).to.be.json;
            expect(res.body.ticketmasterID).to.equal(`${concertId}`);
            expect(res.body.name).to.equal('testConcert');
            expect(res.body.artist).to.equal('testConcert');
            expect(res.body.date).to.equal('2023-05-01');
            expect(res.body.description).to.equal('test description');
            expect(res.body.location).to.equal('testCity');
            expect(res.body.image).to.equal('https://test.com/image.jpg');
            expect(res.body.ticketLink).to.equal('https://test.com/tickets');
            done();
          });
      });

      it('should respond with a 500 status code when an error occurs', (done) => {
        axiosStub
          .withArgs(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&id=${concertId}`)
          .throws(new Error());

          chai
          .request(server)
          .get(`/concerts/${concertId}`)
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            res.should.have.status(500);
            expect(res).to.be.json;
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Error finding concert data.');
            done();
          });
      });
  });
});