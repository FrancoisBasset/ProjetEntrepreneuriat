const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { database } = require('../../models');
const check = require('../utils');

module.exports = function() {
	beforeEach(async function() {
		await database.sync({
			force: true
		});
	});

	it('no domains, /domains?search=hist', async function() {
		const response = await chai.request('http://localhost').get('/domains?search=hist');

		check.checkEmpty(response);
	});

	it('domain Histoire, /domains?search=hist', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		var response = await chai.request('http://localhost').get('/domains?search=hist');

		check.checkLength(response, 1);
		check.checkResponse(response.body.response[0], {
			id: 1,
			name: 'Histoire'
		});

		response = await chai.request('http://localhost').get('/domains?search=name');

		check.checkEmpty(response);
	});
};