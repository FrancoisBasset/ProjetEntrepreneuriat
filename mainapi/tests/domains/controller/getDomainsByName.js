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

	it('no domains, search hist', async function() {
		const response = await DomainsController.getDomainsByName('hist');

		response.status.should.equal(200);
		response.success.should.be.true;
		response.body.should.length(0);
	});

	it('domain Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		var response = await DomainsController.getDomainsByName('hist');

		response.status.should.equal(200);
		response.success.should.be.true;
		response.body.should.length(1);
		response.body[0].id.should.equal(1);
		response.body[0].name.should.equal('Histoire');

		response = await DomainsController.getDomainsByName('name');

		response.status.should.equal(200);
		response.success.should.be.true;
		response.body.should.length(0);
	});
};