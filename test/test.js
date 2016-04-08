'use strict';
/* eslint-env mocha */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var yosay = require('../');

function getFixturePath(testName) {
  return path.join(__dirname, 'fixture', testName + '.json');
}

console.log(yosay(chalk.red('WHAT DOES THE YO SAY??? ') + chalk.yellow('\'ALLO \'ALLO')));

describe('yosay', function () {
  // New test template.
  //
  // it('should _____', function (done) {
  //   var testName = 'short-description';
  //   var expected = yosay('String to test');
  //
  //   // Create fixture: run once, then remove from test:
  //   fs.writeFile(getFixturePath(testName), JSON.stringify(expected));
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
    var expected = yosay('Hi', {maxLength: 8});

    fs.readFile(getFixturePath(testName), function (err, data) {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should override a maxLength setting that is too short', function (done) {
    var testName = 'override-maxLength';
    var expected = yosay('Hello, buddy!', {maxLength: 4});

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
      var expected = yosay('first line\nsecond line\n\nfourth line');

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle fullwidth characters', function (done) {
      var testName = 'handle-fullwidth';
      var expected = yosay('项目可以更新了');

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should display long words correctly', function (done) {
      var testName = 'long-words';
      var expected = yosay('iloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicorns');

      fs.readFile(getFixturePath(testName), function (err, data) {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });
  });
});
