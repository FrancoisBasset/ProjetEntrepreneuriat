const spawn = require('child_process').spawn;
const fs = require('fs');

const bleno = require('bleno');
const Characteristic = bleno.Characteristic;

var joystickScript, buttonScript, ledScript;

var position = 0;

var subscribeCallback;

toDoInPage = (data) => {
	const message = data.toString().trim();
	console.log(message);

	subscribeCallback(Buffer.from(message));
};

toDoInQcm = (data) => {
	const message = data.toString().trim();
	console.log(message);

	if (message == 'UP' && position > 0) {
		position--;
	} else if (message == 'DOWN' && position < 3) {
		position++;
	}	

	ledScript.stdin.write(`{"function":"blink", "value": ${position.toString()}}\n`);
	
	subscribeCallback(Buffer.from(message));
};

module.exports = new Characteristic({
	uuid: 'fff1',
	properties: ['write', 'notify'],
	descriptors: [
		new bleno.Descriptor({
			uuid: '2901',
			value: 'JoystickCharacteristic'
		})
	],
	onSubscribe: function(size, callback) {
		console.log('Subscribe');
		subscribeCallback = callback;

		joystickScript = spawn('python3', ['joystick.py']);
		buttonScript = spawn('python3', ['button.py']);
		ledScript = spawn('python3', ['led.py']);
		
		joystickScript.stdout.on('data', toDoInPage);
		if (fs.existsSync('qcm')) {
			fs.unlinkSync('qcm');
		}

		buttonScript.stdout.on('data', (data) => {
			const message = data.toString().trim();
			console.log(message);
			
			callback(Buffer.from(message));
		});
	},
	onUnsubscribe: function() {
		console.log('Unsubscribe');

		joystickScript.kill(9);
		buttonScript.kill(9);
		ledScript.kill(9);
	},
	onWriteRequest: async function(data, offset, withoutResponse, callback) {
		const message = data.toString();
		console.log(message);

		if (message == 'enterQcm') {
			joystickScript.kill(9);
			joystickScript = spawn('python3', ['joystick.py']);
			joystickScript.stdout.on('data', toDoInQcm);
			fs.writeFileSync('qcm');

			ledScript.stdout.on('data', (data) => {
				console.log(data.toString());
				
			});

			ledScript.stdin.write('{"function":"blink","value":0}\n');
		}

		if (message == 'exitQcm') {
			joystickScript.kill(9);
			joystickScript = spawn('python3', ['joystick.py']);
			joystickScript.stdout.on('data', toDoInPage);
			if (fs.existsSync('qcm')) {
				fs.unlinkSync('qcm');
			}
			
			ledScript.stdin.write('off\n');
		}
		
		callback(Characteristic.RESULT_SUCCESS);
	}
});