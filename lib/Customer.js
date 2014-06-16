'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var request = require('request');
var xml2json = require('xml2json');
var clone = require('lodash.clone');

var ensureArray = function(o) {
  if (!Array.isArray(o)) {
    return [o];
  }
  return o;
};

function Customer(base, opt){
  EventEmitter.call(this);

  var loc = clone(opt);

  if (!loc.address) {
    throw new Error('Missing address option');
  }
  if (!loc.city) {
    throw new Error('Missing city option');
  }
  if (!loc.state) {
    throw new Error('Missing state option');
  }
  if (loc.secondaryAddress) {
    throw new Error('secondaryAddress option not supported');
  }

  // TODO: default type

  // normalize secondaryAddress
  if (loc.apt) {
    loc.secondaryAddress = ['APT', loc.apt];
  } else if (loc.floor) {
    loc.secondaryAddress = ['FLOOR', loc.floor];
  } else if (loc.suite) {
    loc.secondaryAddress = ['SUITE', loc.suite];
  } else {
    loc.secondaryAddress = ['NON', '-'];
  }

  this.location = loc;
  this.base = base;
  this.jar = request.jar();
  this.clientType = 'IPHONE';
}
util.inherits(Customer, EventEmitter);

Customer.prototype.stores = function(cb) {
  var url = [
    this.base+'/stores/search',
    this.location.type,
    this.location.address,
    this.location.secondaryAddress[0],
    this.location.secondaryAddress[1],
    this.location.city,
    this.location.state,
    '-.xml'
  ].join('/');

  console.log(url);

  var requestOpt = {
    url: url,
    method: 'GET',
    jar: this.jar,
    qs: {
      site: this.clientType
    }
  };

  request(requestOpt, function(err, res, body){
    if (err) {
      return cb(err);
    }
    var parsed = xml2json.toJson(body, {object: true});
    var out = {};
    ensureArray(parsed.response.data.dataElement).forEach(function(storeType){
      out[storeType.type] = ensureArray(storeType.stores.store);
    });
    cb(null, out);
  });
};

module.exports = Customer;
