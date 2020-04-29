const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		Domains.destroy({
			truncate: true
		});
	});

	it('response status should equal 404', async function() {
		const response = await chai.request('http://localhost').get('/domains/1');
		response.status.should.equal(404);
	});

	it('response status should equal 200', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const response = await chai.request('http://localhost').get('/domains/1');
		response.status.should.equal(200);
	});

	it('response body should be an object', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const response = await chai.request('http://localhost').get('/domains/1');
		response.body.should.be.an('object');
	});

	it('response body name should equal Histoire', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const response = await chai.request('http://localhost').get('/domains/1');
		response.body.name.should.equal('Histoire');
	});

	it('response body name should equal Géographie', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire' },
			{ name: 'Géographie' }
		]);

		const response = await chai.request('http://localhost').get('/domains/2');
		response.body.name.should.equal('Géographie');
	});
};