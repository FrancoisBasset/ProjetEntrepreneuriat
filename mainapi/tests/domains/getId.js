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
		const response = await chai.request('http://localhost').get('/domains/1');

		check.checkNotFound(response, 'Domain 1 not found');
	});

	it('domain Histoire', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		var response = await chai.request('http://localhost').get('/domains/1');
		
		check.checkSuccess(response, 200);
		check.checkResponse(response.body.response, {
			id: 1,
			name: 'Histoire'
		});

		response = await chai.request('http://localhost').get('/domains/2');
		
		check.checkNotFound(response, 'Domain 2 not found');
	});
};