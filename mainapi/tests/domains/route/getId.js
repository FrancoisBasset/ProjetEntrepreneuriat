const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { DomainsController } = require('../../../controllers');
const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		Domains.destroy({
			truncate: true
		});
	});

	it('no domains', async function() {
		const response = await chai.request('http://localhost').get('/domains/1');

		response.status.should.equal(404);
		response.body.status.should.equal(404);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Domain not found with id 1');
	});

	it('domain Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		var response = await chai.request('http://localhost').get('/domains/1');
		
		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.id.should.equal(1);
		response.body.body.name.should.equal('Histoire');

		response = await chai.request('http://localhost').get('/domains/2');
		response.status.should.equal(404);
		response.body.status.should.equal(404);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Domain not found with id 2');
	});
};