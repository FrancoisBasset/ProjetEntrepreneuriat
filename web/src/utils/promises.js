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

async function getDomain(id) {
	const response = await fetch(`http://localhost/sections/domains/${id}`);
	const json = await response.json();
	return json.response;
}

async function getBranches() {
	const response = await fetch(`http://localhost/sections/branches`);
	const json = await response.json();
	return json.response;
}

async function getBranch(id) {
	const response = await fetch(`http://localhost/sections/branches/${id}`);
	const json = await response.json();
	return json.response;
}

async function getCourses() {
	const response = await fetch(`http://localhost/sections/courses`);
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

async function getClientsCourses(id) {
	const account = await getAccount();

	for (const course of account.courses) {
		if (course.id == id) {
			return course.clients_courses;
		}
	}

	return null;
}

async function getClass(id) {
	const response = await fetch(`http://localhost/classes/${id}`);
	const json = await response.json();
	return json.response;
}

async function getChats(classId) {
	const response = await fetch(`http://localhost/chats/${classId}`);
	const json = await response.json();
	return json.response;
}

export {
	getAccount,
	getDomains,
	getDomain,
	getBranches,
	getBranch,
	getCourses,
	getCourse,
	getChapter,
	getPage,
	getClientsCourses,
	getClass,
	getChats
};