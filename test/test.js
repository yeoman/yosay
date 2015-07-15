'use strict';
var assert = require('assert');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var yosay = require('../');

console.log(yosay(chalk.red('WHAT DOES THE YO SAY??? ') + chalk.yellow('\'ALLO \'ALLO')));

describe('yosay', function () {

  // New test template.
  //
  // it('should _____', function (done) {
  //   var testName = 'short-description';
  //   var expected = yosay('String to test');
  //
  //   // run once, then remove from test:
  //   createFixture(testName, expected);
  //
  //   fs.readFile(getFixturePath(testName), function (err, data) {
  //     assert.ifError(err);
  //     assert.equal(JSON.parse(data), expected);
  //     done();
  //   });
  // });

  it('should return correctly formatted string', function (done) {
    var testName = 'correctly-formatted';
    var expected = yosay('Hi');

    fs.readFile(getFixturePath(testName), function (err, data) {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should allow customization of line length', function (done) {
    var testName = 'length-customization';
    var expected = yosay('Hi', { maxLength: 8 });

    fs.readFile(getFixturePath(testName), function (err, data) {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should override a maxLength setting that is too short', function (done) {
    var testName = 'override-maxLength';
    var expected = yosay('Hello, buddy!', { maxLength: 4 });

    fs.readFile(getFixturePath(testName), function (err, data) {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  describe('ansi', function () {
    it('should display ansi styling correctly', function (done) {
      var testName = 'ansi';
      var expected = yosay(chalk.red.bgWhite('Hi'));

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle part ansi and part not-ansi', function (done) {
      var testName = 'half-ansi';
      var expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir!');

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should wrap ansi styling to the next line properly', function (done) {
      var testName = 'wrap-ansi-styles';
      var expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir! ' + chalk.bgBlue.white('you are looking') + ' swell today!');

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle new line properly', function (done) {
      var testName = 'handle-new-line';
      var expected = yosay('first line\nthird line\n\nsixth line');
      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });
  });
})

function createFixture(testName, str) {
  fs.writeFile(getFixturePath(testName), JSON.stringify(str));
}

function getFixturePath(testName) {
  return path.join(__dirname, 'fixture', testName + '.json');
}
