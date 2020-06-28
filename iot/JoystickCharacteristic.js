const bleno = require('bleno');

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const Characteristic = bleno.Characteristic;

var subscribed = false;
const actions = {
	'4': 'LEFT',
	'6': 'RIGHT',
	'8': 'UP',
	'2': 'DOWN',
	'5': 'CLICK'
};

function readAction(callback) {
	if (!subscribed) {
		return;
	}

	rl.question('Which action : ', function(action) {
		var message = actions[action];

		if (message == null) {
			message = 'UNKNOWN';
		}

		callback(Buffer.from(message));

		readAction(callback);
	});
}

module.exports = new Characteristic({
	uuid: 'fff1',
	properties: ['notify'],
	descriptors: [
		new bleno.Descriptor({
			uuid: '2901',
			value: 'JoystickCharacteristic'
		})
	],
	onSubscribe: function(size, callback) {
		subscribed = true;
		readAction(callback);
	},
	onUnsubscribe: function() {
		subscribed = false;
		console.log('\nFinish for me !');
	}
});