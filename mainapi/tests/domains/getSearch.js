const { it, beforeEach } = require('mocha');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { Domains } = require('../../models');

module.exports = function() {
	beforeEach(async function() {
		await Domains.Domains.destroy({
			truncate: true
		});
	});

	it('no domains, /domains?search=hist', async function() {
		const response = await chai.request('http://localhost').get('/domains?search=hist');

		response.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.response.should.length(0);
	});

	it('domain Histoire, /domains?search=hist', async function() {
		await Domains.createDomain('Histoire');
		var response = await chai.request('http://localhost').get('/domains?search=hist');

		response.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.response.should.length(1);
		response.body.response[0].id.should.equal(1);
		response.body.response[0].name.should.equal('Histoire');

		response = await chai.request('http://localhost').get('/domains?search=name');

		response.status.should.equal(200);
		response.body.success.should.be.true;
		response.body.response.should.length(0);
	});
};