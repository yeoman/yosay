#!/usr/bin/env node
'use strict';

var pkg = require('../package.json');
var yosay = require('./yosay');
var argv = require('minimist')(process.argv.slice(2));

function stdin(cb) {
  var ret = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) { ret += data; });
  process.stdin.on('end', function () { cb(ret); }).resume();
}

function help() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage');
  console.log('  $ echo <string> | yosay');
  console.log('  $ echo <string> | yosay --maxLength 8');
  console.log('');
  console.log('Example');
  console.log('  $ echo "Sindre is a horse" | yosay');
  console.log(yosay('Sindre is a horse'));
}


function logMessage(message) {
  console.log(yosay(message, argv));
}

if (argv.h || argv.help) {
  help();
  return;
}

if (argv.v || argv.version) {
  console.log(pkg.version);
  return;
}

if (process.stdin.isTTY) {
  help();
  return;
} else {
  stdin(logMessage);
}
