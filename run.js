/******************************************************************************
 *    VARIABLE DEFINITIONS
 ******************************************************************************
 */
var assert = require('assert'),
    request = require('request'),
    fs = require('fs'),
    url = require('url'),
    uriFile = fs.readFileSync('site-config/uri.json', {'encoding':'utf8'}),
    uriObj = JSON.parse(uriFile),
    openLrsUri = url.format(uriObj);
 
/******************************************************************************
 *    FUNCTIONS
 ******************************************************************************
 */
function test01() {
  var opts = { 'strictSSL': false, uri: openLrsUri },
      expectedCode = 200,
      expectedBodyRe = /[>]Version:\s/;

  request(opts, function(err, res, body) {
    assert.equal(err, null, err);
    assert.equal(res.statusCode, expectedCode, 'HTTP ' + res.statusCode);

    if(expectedBodyRe.test(body)) {
      console.log("Test passed: " + opts.uri);
    } else {
      console.log("Test FAILED: " + opts.uri);
      console.log(body);
    }
  });
}

function test02() {
  var opts = { 'strictSSL': false, 
          uri: openLrsUri + '/caliper/about' },
      expectedCode = 200,
      jsonRes;

  request(opts, function(err, res, body) {
    assert.equal(err, null, err);
    assert.equal(res.statusCode, expectedCode, 'HTTP ' + res.statusCode);

    jsonRes = JSON.parse(body);
    if(jsonRes.version === 'Caliper specification 1.0.0') {
      console.log("Test passed: " + opts.uri);
    } else {
      console.log("Test FAILED: " + opts.uri);
      console.log(body);
    }
  });
}

function test03() {
  var opts = { 'strictSSL': false, 
          uri: openLrsUri + '/caliper',
          header: { 'Accept': 'application/json' } },
      expectedCode = 401,
      jsonRes;

  request(opts, function(err, res, body) {
    assert.equal(err, null, err);
    assert.equal(res.statusCode, expectedCode, 'HTTP ' + res.statusCode);

    jsonRes = JSON.parse(body);
    if(jsonRes.message === 'Missing Authorization Header' &&
        jsonRes.path === '/caliper') {
      console.log("Test passed: " + opts.uri);
    } else {
      console.log("Test FAILED: " + opts.uri);
      console.log(body);
    }
  });
}

/******************************************************************************
 *    MAIN LOGIC
 ******************************************************************************
 */
console.log(openLrsUri);
test01();
test02();
test03();
