const { describe } = require('mocha');

describe('domains', function() {
	describe('controller', function() {
		describe('getAllDomains', require('./domains/controller/getAllDomains'));
	});

	describe('route', function() {
		describe('GET', require('./domains/route/get'));
	});
});