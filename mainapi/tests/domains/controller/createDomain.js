const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const { DomainsController } = require('../../../controllers');
const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.destroy({
			truncate: true
		});
	});

	it('domain Histoire', async function() {
		var response = await DomainsController.createDomain('Histoire');
		response.status.should.equal(201);
		response.success.should.be.true;
		response.body.id.should.equal(1);
		response.body.name.should.equal('Histoire');

		response = await DomainsController.getDomainById(1);
		response.status.should.equal(200);
		response.success.should.be.true;
		response.body.id.should.equal(1);
		response.body.name.should.equal('Histoire');
	});

	it('domain Histoire Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		const response = await DomainsController.createDomain('Histoire');

		response.status.should.equal(400);
		response.success.should.not.be.true;
		response.body.should.equal('Domain Histoire already exists');
	});
};