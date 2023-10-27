import chalk from 'chalk';
import pad from 'pad-component';
import wrapAnsi from 'wrap-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import ansiStyles from 'ansi-styles';
import ansiRegex from 'ansi-regex';
import cliBoxes from 'cli-boxes';

const border = cliBoxes.round;
const leftOffset = 17;

const defaultGreeting
	= '\n     _-----_     '
	+ '\n    |       |    '
	+ '\n    |' + chalk.red('--(o)--') + '|    '
	+ '\n   `---------´   '
	+ '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '    '
	+ '\n    /___A___\\   /'
	+ '\n     ' + chalk.yellow('|  ~  |') + '     '
	+ '\n   __' + chalk.yellow('\'.___.\'') + '__   '
	+ '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' ` ';

export default function yosay(message, options = {}) {
	message = (message ?? 'Welcome to Yeoman, ladies and gentlemen!').trim();

	/*
	What you're about to see may confuse you. And rightfully so. Here's an explanation.

	When yosay is given a string, we create a duplicate with the ansi styling
	sucked out. This way, the true length of the string is read by `pad` and
	`wrap`, so they can correctly do their job without getting tripped up by
	the "invisible" ansi. Along with the duplicated, non-ansi string, we store
	the character position of where the ansi was, so that when we go back over
	each line that will be printed out in the message box, we check the
	character position to see if it needs any styling, then re-insert it if
	necessary.

	Better implementations welcome :)
	*/

	const styledIndexes = {};
	let maxLength = 24;
	let topOffset = 4;
	let completedString = '';

	// Amount of characters of the yeoman character »column«      → `    /___A___\   /`
	const YEOMAN_CHARACTER_WIDTH = 17;

	// Amount of characters of the default top frame of the speech bubble → `╭──────────────────────────╮`
	const DEFAULT_TOP_FRAME_WIDTH = 28;

	// The speech bubble will overflow the Yeoman character if the message is too long.
	const MAX_MESSAGE_LINES_BEFORE_OVERFLOW = 7;

	// Amount of characters of a total line
	let TOTAL_CHARACTERS_PER_LINE = YEOMAN_CHARACTER_WIDTH + DEFAULT_TOP_FRAME_WIDTH;

	if (options.maxLength) {
		maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length;

		if (maxLength < options.maxLength) {
			maxLength = options.maxLength;
			TOTAL_CHARACTERS_PER_LINE = maxLength + YEOMAN_CHARACTER_WIDTH + topOffset;
		}
	}

	const regexNewline = new RegExp(`\\s{${maxLength}}`);
	const borderHorizontal = border.top.repeat(maxLength + 2);

	const frame = {
		top: border.topLeft + borderHorizontal + border.topRight,
		side: ansiStyles.reset.open + border.left + ansiStyles.reset.open,
		bottom: ansiStyles.reset.open + border.bottomLeft + borderHorizontal + border.bottomRight,
	};

	message.replace(ansiRegex(), (match, offset) => {
		for (const value of Object.values(styledIndexes)) {
			offset -= value.length;
		}

		styledIndexes[offset] = styledIndexes[offset] ? styledIndexes[offset] + match : match;
	});

	const strippedMessage = stripAnsi(message);
	const spacesIndex = [];

	// TODO: Remove `.reduce`.
	// eslint-disable-next-line unicorn/no-array-reduce
	strippedMessage.split(' ').reduce((accumulator, currentValue) => {
		spacesIndex.push(accumulator + currentValue.length);
		return spacesIndex.at(-1) + 1;
	}, 0);

	return wrapAnsi(strippedMessage, maxLength, {hard: true})
		.split(/\n/)
		// TODO: Remove `.reduce`.
		// eslint-disable-next-line unicorn/no-array-reduce
		.reduce((greeting, string_, index, array) => {
			if (!regexNewline.test(string_)) {
				string_ = string_.trim();
			}

			completedString += string_;

			let offset = 0;

			for (const element of spacesIndex) {
				const character = completedString[element - offset];
				if (character) {
					if (character !== ' ') {
						offset += 1;
					}
				} else {
					break;
				}
			}

			string_ = completedString
				.slice(completedString.length - string_.length)
				.replaceAll(/./g, (character, characterIndex) => {
					characterIndex += completedString.length - string_.length + offset;

					let hasContinuedStyle = 0;
					let continuedStyle;

					for (const offset of Object.keys(styledIndexes)) {
						if (characterIndex > offset) {
							hasContinuedStyle++;
							continuedStyle = styledIndexes[offset];
						}

						if (hasContinuedStyle === 1 && characterIndex < offset) {
							hasContinuedStyle++;
						}
					}

					if (styledIndexes[characterIndex]) {
						return styledIndexes[characterIndex] + character;
					}

					if (hasContinuedStyle >= 2) {
						return continuedStyle + character;
					}

					return character;
				})
				.trim();

			const paddedString = pad({
				length: stringWidth(string_),
				valueOf() {
					return ansiStyles.reset.open + string_ + ansiStyles.reset.open;
				},
			}, maxLength);

			if (index === 0) {
				// Need to adjust the top position of the speech bubble depending on the
				// amount of lines of the message.
				if (array.length === 2) {
					topOffset -= 1;
				}

				if (array.length >= 3) {
					topOffset -= 2;
				}

				// The speech bubble will overflow the Yeoman character if the message
				// is too long. So we vertically center the bubble by adding empty lines
				// on top of the greeting.
				if (array.length > MAX_MESSAGE_LINES_BEFORE_OVERFLOW) {
					const emptyLines = Math.ceil((array.length - MAX_MESSAGE_LINES_BEFORE_OVERFLOW) / 2);

					for (let i = 0; i < emptyLines; i++) {
						greeting.unshift('');
					}

					frame.top = pad.left(frame.top, TOTAL_CHARACTERS_PER_LINE);
				}

				greeting[topOffset - 1] += frame.top;
			}

			greeting[index + topOffset]
				= (greeting[index + topOffset] || pad.left('', leftOffset))
				+ frame.side + ' ' + paddedString + ' ' + frame.side;

			if (array.length === index + 1) {
				greeting[index + topOffset + 1]
					= (greeting[index + topOffset + 1] || pad.left('', leftOffset))
					+ frame.bottom;
			}

			return greeting;
		}, defaultGreeting.split(/\n/))
		.join('\n') + '\n';
}
