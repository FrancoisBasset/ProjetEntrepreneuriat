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

	it('result success = true', async function() {
		const result = await DomainsController.getDomainById(1);

		result.success.should.be.true;
	});

	it('result response = null', async function() {
		const result = await DomainsController.getDomainById(1);

		chai.expect(result.response).to.be.null;
	});

	it('result response name = Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		const result = await DomainsController.getDomainById(1);

		result.response.name.should.equal('Histoire');
	});

	it('result response name = Géographie', async function() {
		await DomainsController.createDomain('Histoire');
		await DomainsController.createDomain('Géographie');
		const result = await DomainsController.getDomainById(2);
		
		result.response.name.should.equal('Géographie');
	});
};