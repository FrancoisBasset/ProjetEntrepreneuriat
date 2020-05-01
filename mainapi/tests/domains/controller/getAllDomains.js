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

	it('result success = true', async function() {
		const result = await DomainsController.createDomain('Histoire');

		result.success.should.be.true;
	});

	it('result response length = 1', async function() {
		await DomainsController.createDomain('Histoire');
		const result = await DomainsController.getAllDomains();

		result.response.should.length(1);
	});

	it('result response length = 3', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');
		const result = await DomainsController.getAllDomains();

		result.response.should.length(3);
	});

	it('result response[0] name = Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		const result = await DomainsController.getAllDomains();

		result.response[0].name.should.equal('Histoire');
	});
};