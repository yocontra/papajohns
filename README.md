# papajohns [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Support us][gittip-image]][gittip-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]


## Information

<table>
<tr>
<td>Package</td><td>papajohns</td>
</tr>
<tr>
<td>Description</td>
<td>Unofficial API client</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```javascript
var papajohns = require('papajohns');

// also supports apt, floor, and suite
var customer = papajohns.customer({
  type: "home", // home or business
  address: "2939 W Durango Street",
  city: "Phoenix",
  state: "AZ"
});

// Find the nearest delivery store
customer.stores(function(err, stores){
  if (!stores.Delivery) throw "No delivery available";
  console.log(stores.Delivery[0]);
});
```

## Like what we do?

[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/papajohns.svg
[npm-url]: https://npmjs.org/package/papajohns
[npm-image]: http://img.shields.io/npm/v/papajohns.svg

[travis-url]: https://travis-ci.org/wearefractal/papajohns
[travis-image]: http://img.shields.io/travis/wearefractal/papajohns.svg

[coveralls-url]: https://coveralls.io/r/wearefractal/papajohns
[coveralls-image]: http://img.shields.io/coveralls/wearefractal/papajohns/master.svg
