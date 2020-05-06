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

	it('no domains', async function() {
		const response = await chai.request('http://localhost').get('/domains');

		check.checkEmpty(response);
	});

	it('domain Histoire', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		const response = await chai.request('http://localhost').get('/domains');

		check.checkLength(response, 1);
		check.checkResponse(response.body.response[0], {
			id: 1,
			name: 'Histoire',
			branches: []
		});
	});
};