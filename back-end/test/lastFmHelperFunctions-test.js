const chai = require('chai');
const chaiHttp = require('chai-http');
const helpers = require('../lastfmHelperFunctions');

chai.use(chaiHttp);

const md5 = require('md5');

describe('getSignature', () => {
    it('returns a users api signature, which should be the md5 hash of their last-fm credentials', () => {
      const signature = helpers.getSignature("3MUW1dADnbHWYiMUJYAiQ-9D_nNx68I_");
      signature.should.be.a('string');
      signature.should.have.lengthOf(32);
    });
});
