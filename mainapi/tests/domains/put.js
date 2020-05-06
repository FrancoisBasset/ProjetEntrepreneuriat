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

	it('no id or name', async function() {
		const response = await chai.request('http://localhost').put('/domains').send();

		check.checkBadRequest(response, 'Id or name not given');
	});

	it('no domains', async function() {
		const response = await chai.request('http://localhost').put('/domains').send({
			id: 1,
			name: 'Géographie'
		});

		check.checkBadRequest(response, 'Domain not found with id 1');
	});
	
	it('domain Histoire Géographie', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		const response = await chai.request('http://localhost').put('/domains').send({
			id: 1,
			name: 'Géographie'
		});

		check.checkSuccess(response, 200);
		check.checkResponse(response.body.response, {
			id: 1,
			name: 'Géographie'
		});
	});
};