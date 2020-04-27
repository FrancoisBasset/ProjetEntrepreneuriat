const { it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.destroy({
			truncate: true
		});
	});

	it('response status should be equals 200', async function() {
		const response = await chai.request('http://localhost').get('/domains');
		response.status.should.be.equals(200);
	});

	it('response body should be an array', async function() {
		const response = await chai.request('http://localhost').get('/domains');
		response.body.should.be.an('array');
	});

	it('response body length should be equals 0', async function() {
		const response = await chai.request('http://localhost').get('/domains');
		response.body.length.should.be.equals(0);
	});

	it('response body length should be equals 3', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const response = await chai.request('http://localhost').get('/domains');
		response.body.length.should.be.equals(3);
	});

	it('domain getDataValue name should be equals Histoire', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const response = await chai.request('http://localhost').get('/domains');
		response.body[0].name.should.be.equals('Histoire');
	});
};