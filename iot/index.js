const bleno = require('bleno');

const RemoteService = require('./RemoteService');
const ButtonCharacteristic = require('./ButtonCharacteristic');

RemoteService.characteristics = [ButtonCharacteristic];

bleno.setServices([RemoteService]);

bleno.on('stateChange', function(state) {
	console.log('On: ' + state);
    if (state === 'poweredOn') {
        console.log("Start advertising");
        bleno.startAdvertising('Raspberry Pi', ['EcoleConfinee']);
    } else {
        console.log("Stop advertising");
        bleno.stopAdvertising();
    }
});

bleno.on('accept', function(address) {
	console.log('Connection from ' + address);
});

bleno.on('disconnect', function(address) {
	console.log('Disconnection from ' + address);
});