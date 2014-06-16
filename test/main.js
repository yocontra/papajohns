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
  it('should be able to construct with address', function(done){
    var user = pjs.customer({
      address: '1234 Fake St',
      city: 'Los Angeles',
      state: 'CA'
    });
    should.exist(user.location);
    user.location.address.should.equal('1234 Fake St');
    user.location.secondaryAddress.should.eql(['NON', '-']);
    done();
  });

  // secondary address crap
  it('should be able to construct with apartment number', function(done){
    var user = pjs.customer({
      address: '1234 Fake St',
      apt: 2315,
      city: 'Los Angeles',
      state: 'CA'
    });
    should.exist(user.location);
    user.location.address.should.equal('1234 Fake St');
    user.location.secondaryAddress.should.eql(['APT', 2315]);
    done();
  });
  it('should be able to construct with suite number', function(done){
    var user = pjs.customer({
      address: '1234 Fake St',
      suite: 2315,
      city: 'Los Angeles',
      state: 'CA'
    });
    should.exist(user.location);
    user.location.address.should.equal('1234 Fake St');
    user.location.secondaryAddress.should.eql(['SUITE', 2315]);
    done();
  });
  it('should be able to construct with floor number', function(done){
    var user = pjs.customer({
      address: '1234 Fake St',
      floor: 2,
      city: 'Los Angeles',
      state: 'CA'
    });
    should.exist(user.location);
    user.location.address.should.equal('1234 Fake St');
    user.location.secondaryAddress.should.eql(['FLOOR', 2]);
    done();
  });
});
