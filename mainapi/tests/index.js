const { describe } = require('mocha');

describe('domains', function() {
	describe('controller', function() {
		describe('getAllDomains', require('./domains/controller/getAllDomains'));
		describe('getDomainsByName', require('./domains/controller/getDomainsByName'));
		describe('getDomainById', require('./domains/controller/getDomainById'));
	});

	describe('route', function() {
		describe('GET', require('./domains/route/get'));
		describe('GET/?search', require('./domains/route/getSearch'));
		describe('GET/:id', require('./domains/route/getId'));
	});
});