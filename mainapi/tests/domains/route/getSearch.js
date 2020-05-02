const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { DomainsController } = require('../../../controllers');
const { Domains } = require('../../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.destroy({
			truncate: true
		});
	});

	it('no domains, search list', async function() {
		const response = await chai.request('http://localhost').get('/domains');

		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.should.length(0);
	});

	it('domain Histoire', async function() {
		await DomainsController.createDomain('Histoire');
		var response = await chai.request('http://localhost').get('/domains?search=hist');

		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.should.length(1);
		response.body.body[0].id.should.equal(1);
		response.body.body[0].name.should.equal('Histoire');

		response = await chai.request('http://localhost').get('/domains?search=name');

		response.status.should.equal(200);
		response.body.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.body.should.length(0);
	});
};