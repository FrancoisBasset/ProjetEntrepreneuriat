const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const { DomainsController } = require('../../../controllers');
const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		Domains.destroy({
			truncate: true
		});
	});

	it('no domains', async function() {
		const response = await DomainsController.getDomainById(1);

		response.status.should.equal(404);
		response.success.should.not.be.true;
		response.body.should.equal('Domain not found with id 1');
	});

	it('domain Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		var response = await DomainsController.getDomainById(1);
		
		response.status.should.equal(200);
		response.success.should.be.true;
		response.body.id.should.equal(1);
		response.body.name.should.equal('Histoire');

		response = await DomainsController.getDomainById(2);
		response.status.should.equal(404);
		response.success.should.not.be.true;
		response.body.should.equal('Domain not found with id 2');
	});
};