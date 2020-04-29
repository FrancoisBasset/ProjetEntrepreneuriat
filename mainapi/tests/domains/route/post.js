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

	it('response status should equal 201', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});

		response.status.should.equal(201);
	});

	it('response status should equal 400', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({});
		response.status.should.equal(400);
	});

	it('response body should have property id', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});

		response.body.should.have.property('id');
	});

	it('response body should have property name', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});

		response.body.should.have.property('name');
	});

	it('response body should equal Histoire', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});

		response.body.name.should.equal('Histoire');
	});

	it('response body should length 3', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		await chai.request('http://localhost').post('/domains').send({
			name: 'Géographie'
		});
		await chai.request('http://localhost').post('/domains').send({
			name: 'Code'
		});

		const response = await chai.request('http://localhost').get('/domains');
		response.body.should.length(3);
	});

	it('response body name should equal Géographie', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		await chai.request('http://localhost').post('/domains').send({
			name: 'Géographie'
		});

		const response = await chai.request('http://localhost').get('/domains/2');
		response.body.name.should.equal('Géographie');
	});
};