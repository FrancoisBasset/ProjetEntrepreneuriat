<template>
	<div>
		<h1>Toutes les classes virtuelles</h1>

		<div>
			<div v-for="classe of classes" :key="classe.id">
				<router-link :to="{ path: '/classStart', query: { classId: classe.id } }">
					<button style="width: 150px; height: 100px">{{ classe.name }}</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AllClasses',
	data: function() {
		return {
			classes: null
		}
	},
	created: async function() {
		const response = await fetch('http://localhost/classes');
		const json = await response.json();

		this.classes = json.response;
	}
}
</script>