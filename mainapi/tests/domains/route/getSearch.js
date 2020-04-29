const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.destroy({
			truncate: true
		});
	});

	it('response status should equal 200', async function() {
		const response = await chai.request('http://localhost').get('/domains?search=test');
		response.status.should.equal(200);
	});

	it('response body should be an array', async function() {
		const response = await chai.request('http://localhost').get('/domains?search=test');
		response.body.should.be.an('array');
	});

	it('response body should length 0', async function() {
		const response = await chai.request('http://localhost').get('/domains?search=test');
		response.body.should.length(0);
	});

	it('response body should length 1', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const response = await chai.request('http://localhost').get('/domains?search=hist');
		response.body.should.length(1);
	});

	it('response body should length 2', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const response = await chai.request('http://localhost').get('/domains?search=r');
		response.body.should.length(2);
	});

	it('domain getDataValue name should equal Histoire', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const response = await chai.request('http://localhost').get('/domains?search=hist');
		response.body[0].name.should.equal('Histoire');
	});
};