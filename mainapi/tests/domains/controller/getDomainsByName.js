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

	it('domains should not be null', async function() {
		const domains = await DomainsController.getDomainsByName('hist');
		domains.should.not.be.null;
	});

	it('domains should be an array', async function() {
		const domains = await DomainsController.getDomainsByName('hist');
		domains.should.be.an('array');
	});

	it('domains should length 0', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const domains = await DomainsController.getDomainsByName('name');
		domains.should.length(0);
	});

	it('domains should length 1', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const domains = await DomainsController.getDomainsByName('hist');
		domains.should.length(1);
	});

	it('domains should length 2', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const domains = await DomainsController.getDomainsByName('r');
		domains.should.length(2);
	});

	it('domains[0] name should equals Histoire', async function() {
		await Domains.bulkCreate([
			{ name: 'Histoire'},
			{ name: 'Géographie'},
			{ name: 'Code'}
		]);

		const domains = await DomainsController.getDomainsByName('hist');
		domains[0].name.should.equals('Histoire');
	});
};