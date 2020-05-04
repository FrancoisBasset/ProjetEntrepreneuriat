const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { DomainsController } = require('../../../controllers');
const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.destroy({
			truncate: true
		});
	});

	it('no id or name', async function() {
		const response = await chai.request('http://localhost').put('/domains').send();

		response.status.should.equal(400);
		response.body.status.should.equal(400);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Id or name not given');
	});

	it('no domains', async function() {
		const response = await chai.request('http://localhost').put('/domains').send({
			id: 1,
			name: 'Géographie'
		});

		response.status.should.equal(400);
		response.body.status.should.equal(400);
		response.body.success.should.not.be.true;
		response.body.body.should.equal('Domain not found with id 1');
	});
	
	it('domain Histoire Géographie', async function() {
		await DomainsController.createDomain('Histoire');
		const response = await chai.request('http://localhost').put('/domains').send({
			id: 1,
			name: 'Géographie'
		});		

		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.id.should.equal(1);
		response.body.body.name.should.equal('Géographie');
	});
};