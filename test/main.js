'use strict';

var pjs = require('../');
var should = require('should');
require('mocha');

before(function(){
  this.originalBase = pjs.base;
  pjs.base = 'some local server';
});

after(function(){
  pjs.base = this.originalBase;
});

describe('Customer', function() {
  it('should be able to construct from apartment number', function(done){
    var user = pjs.customer({
      address: '1234 Fake St',
      apt: 2315
    });
    should.exist(user.location);
    user.location.address.should.equal('1234 Fake St');
    user.location.secondaryAddress.should.eql(['APT', '2315']);
    done();
  });
});
