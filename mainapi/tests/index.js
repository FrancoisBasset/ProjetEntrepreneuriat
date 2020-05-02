const { describe } = require('mocha');

describe('domains', function() {
	describe('controller', function() {
		describe('getAllDomains', require('./domains/controller/getAllDomains'));
		describe('getDomainsByName', require('./domains/controller/getDomainsByName'));
		describe('getDomainById', require('./domains/controller/getDomainById'));
		describe('createDomain', require('./domains/controller/createDomain'));
		describe('updateDomain', require('./domains/controller/updateDomain'));
	});

	describe('route', function() {
		describe('GET', require('./domains/route/get'));
		describe('GET/?search', require('./domains/route/getSearch'));
		describe('GET/:id', require('./domains/route/getId'));
		describe('POST', require('./domains/route/post'));
		describe('PUT', require('./domains/route/updateDomain'));
	});
});