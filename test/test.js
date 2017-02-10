'use strict';
/* eslint-env mocha */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const yosay = require('../');

const getFixturePath = testName => path.join(__dirname, 'fixture', `${testName}.json`);

console.log(yosay(chalk.red('WHAT DOES THE YO SAY??? ') + chalk.yellow('\'ALLO \'ALLO')));

describe('yosay', () => {
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

  it('should return correctly formatted string', done => {
    const testName = 'correctly-formatted';
    const expected = yosay('Hi');

    fs.readFile(getFixturePath(testName), (err, data) => {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should return correctly formatted string in two lines', done => {
    const testName = 'correctly-formatted-two-lines';
    const expected = yosay('Welcome to Yeoman, ladies and gentlemen!');

    fs.readFile(getFixturePath(testName), (err, data) => {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should allow customization of line length', done => {
    const testName = 'length-customization';
    const expected = yosay('Hi', {maxLength: 8});

    fs.readFile(getFixturePath(testName), (err, data) => {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  it('should override a maxLength setting that is too short', done => {
    const testName = 'override-maxLength';
    const expected = yosay('Hello, buddy!', {maxLength: 4});

    fs.readFile(getFixturePath(testName), (err, data) => {
      assert.ifError(err);
      assert.equal(JSON.parse(data), expected);
      done();
    });
  });

  describe('ansi', () => {
    it('should display ansi styling correctly', done => {
      const testName = 'ansi';
      const expected = yosay(chalk.red.bgWhite('Hi'));

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle part ansi and part not-ansi', done => {
      const testName = 'half-ansi';
      const expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir!');

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should wrap ansi styling to the next line properly', done => {
      const testName = 'wrap-ansi-styles';
      const expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir! ' + chalk.bgBlue.white('you are looking') + ' swell today!');

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle new line properly', done => {
      const testName = 'handle-new-line';
      const expected = yosay('first line\nsecond line\n\nfourth line');

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should handle fullwidth characters', done => {
      const testName = 'handle-fullwidth';
      const expected = yosay('项目可以更新了');

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should display long words correctly', done => {
      const testName = 'long-words';
      const expected = yosay('iloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicorns');

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });

    it('should overflow when lines exceed the default greeting', done => {
      const testName = 'overflow';
      const expected = yosay('Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball.', {maxLength: 11});

      fs.readFile(getFixturePath(testName), (err, data) => {
        assert.ifError(err);
        assert.equal(JSON.parse(data), expected);
        done();
      });
    });
  });
});
