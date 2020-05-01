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

		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');
	});

	it('result success = true', async function() {
		const result = await DomainsController.getDomainsByName('Histoire');

		result.success.should.be.true;
	});

	it('result response length = 0', async function() {
		const result = await DomainsController.getDomainsByName('name');

		result.response.should.length(0);
	});

	it('result response length = 1', async function() {
		const result = await DomainsController.getDomainsByName('hist');

		result.response.should.length(1);
	});

	it('result response length = 2', async function() {
		const result = await DomainsController.getDomainsByName('r');

		result.response.should.length(2);
	});

	it('result response[0] name = Histoire', async function() {
		const result = await DomainsController.getDomainsByName('hist');
		
		result.response[0].name.should.equal('Histoire');
	});
};