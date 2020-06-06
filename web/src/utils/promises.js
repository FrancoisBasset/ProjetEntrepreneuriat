async function getAccount() {
	const response = await fetch(`http://localhost/accounts`);
	const json = await response.json();
	return json.response;
}

async function getDomains() {
	const response = await fetch('http://localhost/sections/domains');
	const json = await response.json();
	return json.response;
}

export {
	getAccount,
	getDomains
};