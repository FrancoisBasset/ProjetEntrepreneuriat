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

	it('result errors = not_unique', async function() {
		await DomainsController.createDomain('Histoire');
		const result = await DomainsController.createDomain('Histoire');

		result.errors.should.contain('not_unique');
	});

	it('result response name = Histoire', async function() {
		const result = await DomainsController.createDomain('Histoire');

		result.response.name.should.equal('Histoire');
	});

	it('result response length = 3', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');
		const result = await DomainsController.getAllDomains();

		result.response.should.length(3);
	});

	it('result response name = Géographie', async function() {
		await DomainsController.createDomain('Géographie');
		const result = await DomainsController.getDomainById(1);

		result.response.name.should.equal('Géographie');
	});
};