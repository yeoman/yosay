#!/usr/bin/env node
'use strict';
var stdin = require('get-stdin');
var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');
var yosay = require('./index');
var input = argv._[0];

function help() {
  console.log([
    pkg.description,
    '',
    'Usage',
    '  $ yosay <string>',
    '  $ yosay <string> --maxLength 8',
    '  $ echo <string> | yosay',
    '',
    'Example',
    '  $ yosay "Sindre is a horse"',
    yosay('Sindre is a horse')
  ].join('\n'));
}

function init(message) {
  console.log(yosay(message, argv));
}

if (argv.help) {
  help();
  return;
}

if (argv.version) {
  console.log(pkg.version);
  return;
}

if (process.stdin.isTTY) {
  if (!input) {
    help();
    return;
  }

  init(input);
} else {
  stdin(init);
}
