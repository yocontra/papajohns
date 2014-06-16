'use strict';

var Customer = require('./lib/Customer');

var base = 'http://order.papajohns.com/services';

var papa = {
  base: base,
  customer: function (opt) {
    return new Customer(papa.base, opt);
  }
};

module.exports = papa;
