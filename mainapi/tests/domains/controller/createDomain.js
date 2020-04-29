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

	it('domain should not be null', async function() {
		const domain = await DomainsController.createDomain('Histoire');
		domain.should.not.be.null;
	});

	it('domain should have property id', async function() {
		const domain = await DomainsController.createDomain('Histoire');
		domain.should.have.property('id');
	});

	it('domain should have property name', async function() {
		const domain = await DomainsController.createDomain('Histoire');
		domain.should.have.property('name');
	});

	it('domain name should equal Histoire', async function() {
		const domain = await DomainsController.createDomain('Histoire');
		domain.name.should.equal('Histoire');
	});

	it('domains should length 3', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		await DomainsController.createDomain('Code');

		const domains = await DomainsController.getAllDomains();
		domains.should.length(3);
	});

	it('domain name should equal Géographie', async function() {
		await DomainsController.createDomain('Géographie');
		const domain = await DomainsController.getDomainById(1);
		domain.name.should.equal('Géographie');
	});
};