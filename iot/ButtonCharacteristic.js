const bleno = require('bleno');

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const Characteristic = bleno.Characteristic;

var subscribed = false;
const buttons = [
	'LEFT',	'RIGHT', 'UP', 'DOWN',
	'CLICK',
	'A', 'B', 'C', 'D'
];

function readButton(callback) {
	if (!subscribed) {
		return;
	}

	rl.question('Which button : ', function(button) {
		callback(Buffer.from(buttons[button]));

		readButton(callback);
	});
}

module.exports = new Characteristic({
	uuid: 'fff1',
	properties: ['notify'],
	descriptors: [
		new bleno.Descriptor({
			uuid: '2901',
			value: 'ButtonCharacteristic'
		})
	],
	onSubscribe: function(size, callback) {
		subscribed = true;
		readButton(callback);
	},
	onUnsubscribe: function() {
		subscribed = false;
		console.log('\nFinish for me !');
	}
});