const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const mongoose = require('mongoose');
const passport = require('passport');
const passport = require('passport');

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