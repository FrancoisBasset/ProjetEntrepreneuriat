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

	it('domain should not be null', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const domain = await DomainsController.getDomainById(1);
		domain.should.not.be.null;
	});

	it('domain should be an object', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const domain = await DomainsController.getDomainById(1);
		domain.should.be.an('object');
	});

	it('domain should be null', async function() {
		const domain = await DomainsController.getDomainById(1);
		chai.expect(domain).to.be.null;
	});

	it('domain name should equal Histoire', async function() {
		await Domains.create({
			name: 'Histoire'
		});

		const domain = await DomainsController.getDomainById(1);
		domain.name.should.equal('Histoire');
	});

	it('domain name should equal Géographie', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire' },
			{ name: 'Géographie'}
		]);

		const domain = await DomainsController.getDomainById(2);
		domain.name.should.equal('Géographie');
	});
};