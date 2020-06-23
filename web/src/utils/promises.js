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

async function getCourse(id) {
	const response = await fetch(`http://localhost/sections/courses/${id}`);
	const json = await response.json();
	return json.response;
}

async function getChapter(id) {
	const response = await fetch(`http://localhost/sections/chapters/${id}`);
	const json = await response.json();
	return json.response;
}

async function getPage(id) {
	const response = await fetch(`http://localhost/sections/pages/${id}`);
	const json = await response.json();
	return json.response;
}

export {
	getAccount,
	getDomains,
	getCourse,
	getChapter,
	getPage
};