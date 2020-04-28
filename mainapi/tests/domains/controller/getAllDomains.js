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
		const domains = await DomainsController.getAllDomains();
		domains.should.not.be.null;
	});

	it('domains should be an array', async function() {
		const domains = await DomainsController.getAllDomains();
		domains.should.be.an('array');
	});

	it('domains should length 1', async function() {
		await Domains.create({
			name: 'Histoire'
		});
		
		const domains = await DomainsController.getAllDomains();
		domains.should.length(1);
	});

	it('domains should length 3', async function() {
		await Domains.bulkCreate([
			{name: 'Histoire'},
			{name: 'Géographie'},
			{name: 'Code'}
		]);
		
		const domains = await DomainsController.getAllDomains();
		domains.should.length(3);
	});

	it('domain getDataValue name should be equals Histoire', async function() {
		const domain = await Domains.create({
			name: 'Histoire'
		});

		domain.getDataValue('name').should.be.equals('Histoire');
	});
};