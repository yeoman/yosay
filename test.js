'use strict';
var assert = require('assert');
var yosay = require('./index');

it('should return correctly formatted string', function () {
  var expected = '\n     _-----_\n    |       |    .--------------------------.\n    |\u001b[31m--(o)--\u001b[39m|    |            Hi            |\n   `---------´   \'--------------------------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
  assert.equal(yosay('Hi'), expected);
});

it('should allow customization of line length', function () {
  var expected = '\n     _-----_\n    |       |    .----------.\n    |\u001b[31m--(o)--\u001b[39m|    |    Hi    |\n   `---------´   \'----------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
  assert.equal(yosay('Hi', { maxLength: 8 }), expected);
});

it('should override a maxLength setting that is too short', function () {
  var expected = '\n     _-----_\n    |       |    .--------.\n    |\u001b[31m--(o)--\u001b[39m|    | Hello, |\n   `---------´   | buddy! |\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \'--------\'\n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
  assert.equal(yosay('Hello, buddy!', { maxLength: 4 }), expected);
});
