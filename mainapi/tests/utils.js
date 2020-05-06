function checkSuccess(response, status) {
	response.status.should.equal(status);
	response.body.success.should.be.true;
}

function checkNotFound(response, message) {
	response.status.should.equal(404);
	response.body.success.should.not.be.true;
	response.body.response.should.equal(message);
}

function checkBadRequest(response, message) {
	response.status.should.equal(400);
	response.body.success.should.not.be.true;
	response.body.response.should.equal(message);
}

function checkEmpty(response) {
	checkSuccess(response, 200);
	response.body.response.should.length(0);
}

function checkLength(response, length) {
	checkSuccess(response, 200);
	response.body.response.should.length(length);
}

function checkResponse(response, data) {
	for (const key of Object.keys(data)) {
		response[key].should.equal(data[key]);
	}
}

module.exports = {
	checkSuccess,
	checkNotFound,
	checkBadRequest,
	checkEmpty,
	checkLength,
	checkResponse
};