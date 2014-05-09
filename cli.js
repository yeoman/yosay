#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var yosay = require('./index');
var argv = require('minimist')(process.argv.slice(2));
var input = argv._[0];

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
  console.log('  $ yosay <string>');
  console.log('  $ yosay <string> --maxLength 8');
  console.log('  $ echo <string> | yosay');
  console.log('');
  console.log('Example');
  console.log('  $ yosay "Sindre is a horse"');
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
  if (!input) {
    help();
    return;
  }

  logMessage(input);
} else {
  stdin(logMessage);
}
