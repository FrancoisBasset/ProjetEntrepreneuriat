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

	it('domain name should equal Histoire', async function() {
		await DomainsController.createDomain('Histoire');

		const domain = await DomainsController.getDomainById(1);
		domain.name.should.equal('Histoire');
	});

	it('domain name should equal Géographie', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');

		const domain = await DomainsController.getDomainById(2);
		domain.name.should.equal('Géographie');
	});
};