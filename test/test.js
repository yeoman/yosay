/* eslint-env mocha */
import assert from 'node:assert';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import chalk from 'chalk';
import yosay from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = testName => path.join(__dirname, 'fixture', `${testName}.json`);

const getAssertResult = async (testName, expected) => {
	try {
		const data = await fs.readFile(getFixturePath(testName));
		assert.strictEqual(JSON.parse(data), expected);
	} catch (error) {
		assert.ifError(error);
	}
};

console.log(yosay(chalk.red('WHAT DOES THE YO SAY??? ') + chalk.yellow('\'ALLO \'ALLO')));

describe('yosay', () => {
	it('should return correctly formatted string', async () => {
		const testName = 'correctly-formatted';
		const expected = yosay('Hi');
		await getAssertResult(testName, expected);
	});

	it('should return correctly formatted string in two lines', async () => {
		const testName = 'correctly-formatted-two-lines';
		const expected = yosay('Welcome to Yeoman, ladies and gentlemen!');
		await getAssertResult(testName, expected);
	});

	it('should allow customization of line length', async () => {
		const testName = 'length-customization';
		const expected = yosay('Hi', {maxLength: 8});
		await getAssertResult(testName, expected);
	});

	it('should override a maxLength setting that is too short', async () => {
		const testName = 'override-maxLength';
		const expected = yosay('Hello, buddy!', {maxLength: 4});
		await getAssertResult(testName, expected);
	});

	describe('ansi', () => {
		it('should display ansi styling correctly', async () => {
			const testName = 'ansi';
			const expected = yosay(chalk.red.bgWhite('Hi'));
			await getAssertResult(testName, expected);
		});

		it('should handle part ansi and part not-ansi', async () => {
			const testName = 'half-ansi';
			const expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir!');
			await getAssertResult(testName, expected);
		});

		it('should wrap ansi styling to the next line properly', async () => {
			const testName = 'wrap-ansi-styles';
			const expected = yosay(chalk.red.bgWhite('Hi') + ' there, sir! ' + chalk.bgBlue.white('you are looking') + ' swell today!');
			await getAssertResult(testName, expected);
		});

		it('should handle new line properly', async () => {
			const testName = 'handle-new-line';
			const expected = yosay('first line\nsecond line\n\nfourth line');
			await getAssertResult(testName, expected);
		});

		it('should handle fullwidth characters', async () => {
			const testName = 'handle-fullwidth';
			const expected = yosay('项目可以更新了');
			await getAssertResult(testName, expected);
		});

		it('should display long words correctly', async () => {
			const testName = 'long-words';
			const expected = yosay('iloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicorns');
			await getAssertResult(testName, expected);
		});

		it('should overflow when lines exceed the default greeting', async () => {
			const testName = 'overflow';
			const expected = yosay(
				'Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball.',
				{maxLength: 11},
			);
			await getAssertResult(testName, expected);
		});
	});
});
