<template>
	<div>
		<h1>Mes classes virtuelles</h1>
		<div id="myClasses" v-if="myClasses.length > 0">
			<div v-for="classe of myClasses" :key="classe.id">
				<router-link  :to="{ path: '/classStart', query: { classId: classe.id } }">
					<button style="width: 150px; height: 100px;">{{ classe.name }}</button>
				</router-link>
			</div>
		</div>
		<div v-else>
			<label>Rien ❌</label>
		</div>

		<h1>Classes virtuelles disponibles</h1>

		<div id="allClasses">
			<div v-for="classe of availableClasses" :key="classe.id">
				<router-link  :to="{ path: '/classStart', query: { classId: classe.id } }">
					<button style="width: 150px; height: 100px;">{{ classe.name }}</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';

export default {
	name: 'ClientHomeClasses',
	data: function() {
		return {
			account: null,

			myClasses: [],
			availableClasses: []
		}
	},
	created: async function() {
		const response = await fetch('http://localhost/classes');
		const json = await response.json();

		this.availableClasses = json.response;

		this.account = await getAccount();

		this.myClasses = this.account.classes;

		for (const myClasse of this.myClasses) {
			for (var c = 0; c < this.availableClasses.length; c++) {
				if (myClasse.id == this.availableClasses[c].id) {
					this.availableClasses.splice(c, 1);
					break;
				}
			}
		}

	}
}
</script>

<style scoped>
	#allClasses {
		display: inline-block;
	}

	.button {
		width: 150px;
		height: 100px;
	}
</style>