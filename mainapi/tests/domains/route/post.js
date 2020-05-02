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

	it('no name', async function() {
		const response = await chai.request('http://localhost').post('/domains').send({});

		response.status.should.equal(400);
		response.body.status.should.equal(400);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Name parameter not given');
	});

	it('domain Histoire', async function() {
		var response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		response.status.should.equal(201);
		response.body.status.should.equal(201);
		response.body.success.should.be.true;
		response.body.body.id.should.equal(1);
		response.body.body.name.should.equal('Histoire');

		response = await chai.request('http://localhost').get('/domains/1');
		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.id.should.equal(1);
		response.body.body.name.should.equal('Histoire');
	});

	it('domain Histoire Histoire', async function() {
		await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});
		const response = await chai.request('http://localhost').post('/domains').send({
			name: 'Histoire'
		});

		response.status.should.equal(400);
		response.body.status.should.equal(400);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Domain Histoire already exists');
	});
};