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

	it('length 0 when name not found', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');

		const domains = await DomainsController.getDomainsByName('name');
		domains.should.length(0);
	});

	it('correct length and result', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');

		var domains = await DomainsController.getDomainsByName('hist');
		domains.should.length(1);

		domains = await DomainsController.getDomainsByName('r');
		domains.should.length(2);

		domains = await DomainsController.getDomainsByName('hist');
		domains[0].name.should.equal('Histoire');
	});
};