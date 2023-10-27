#!/usr/bin/env node
import meow from 'meow';
import yosay from './index.js';

const cli = meow(`
	Usage
	  $ yosay <string>
	  $ yosay <string> --maxLength 8
	  $ echo <string> | yosay

	Example
	  $ yosay 'Sindre is a horse'
	  ${yosay('Sindre is a horse')}
`, {
	importMeta: import.meta,
});

console.log(yosay(cli.input[0], cli.flags));
