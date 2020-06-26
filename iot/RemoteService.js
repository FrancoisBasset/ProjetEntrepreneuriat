const bleno = require('bleno');
const PrimaryService = bleno.PrimaryService;

module.exports = new PrimaryService({
	uuid: 'fff0',
	descriptors: [
		new bleno.Descriptor({
			uuid: '2901',
			value: 'Remote'
		})
	]
});