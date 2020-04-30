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

	it('create 1 domain, correct length', async function() {
		await DomainsController.createDomain('Histoire');
		
		const domains = await DomainsController.getAllDomains();
		domains.should.length(1);
	});

	it('create 3 domains, correct length', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');
		
		const domains = await DomainsController.getAllDomains();
		domains.should.length(3);
	});

	it('create 1 domain, correct name', async function() {
		const domain = await DomainsController.createDomain('Histoire');

		domain.name.should.equal('Histoire');
	});
};