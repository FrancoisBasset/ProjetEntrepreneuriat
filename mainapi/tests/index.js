const { describe } = require('mocha');

describe('domains', function() {
	describe('GET /domains', require('./domains/get'));
	describe('GET /domains?search', require('./domains/getSearch'));
	describe('GET /domains/:id', require('./domains/getId'));
	describe('POST /domains', require('./domains/post'));
	describe('PUT /domains/:id', require('./domains/put'));
	//delete
});