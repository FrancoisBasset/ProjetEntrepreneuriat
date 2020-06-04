async function getAccount() {
	const response = await fetch('http://localhost/accounts');
	const json = await response.json();
	return json.response;
}

export default getAccount;