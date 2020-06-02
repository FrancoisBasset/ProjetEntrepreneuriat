<template>
	<h1>{{ account.id }}</h1>
</template>

<script>
export default {
	name: 'ProfessionnalHome',
	data: function() {
		return {
			account: null
		};
	},
	created: async function() {
		const response = await fetch('http://localhost/accounts');
		const json = await response.json();
		this.account = json.response;
	}
}
</script>