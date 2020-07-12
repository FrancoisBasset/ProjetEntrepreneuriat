<template>
	<div>
		<HomeBar home="clientHome" />

		<div>
			<h1>{{ classe.name }}</h1>
		</div>

		<div>
			Description : <label>{{ classe.description }}</label>
		</div>

		<div>
			Classe privée : <input type="checkbox" :checked="classe.private" disabled />
		</div>

		<div>
			Prix : <label>{{ classe.price }} €</label>
		</div>

		<div>
			Fonctionnalités :<br>
			<select multiple v-if="classe.fonctionnalities != null">
				<option v-for="fonctionnality of classe.fonctionnalities.split(';')" :key="fonctionnality">{{ fonctionnality }}</option>
			</select>
		</div>

		<div>
			Date et heure : <label>Le {{ classe.date }}, de {{ classe.beginHour }} à {{ classe.endHour }}</label>
		</div><br>

		<div>
			<div v-if="classe.price > 0 && !owned">
				<button :disabled="account.card == null" v-on:click="pay">Payer le cours</button><br>
				<label v-if="account.card == null">Vous n'avez pas de carte enregistré</label> 
			</div>
			<div v-else>
				<button v-if="!registered" v-on:click="register">S'inscrire</button>
				<div v-else>
					<button>Démarrer</button>
					<button v-on:click="unregister">Se désinscrire</button>
				</div>
			</div>
		</div>

		<div>
			<label style="color: red">{{ error }}</label>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import { getAccount } from '@/utils/promises';

export default {
	name: 'ClassStart',
	components: {
		HomeBar
	},
	data: function() {
		return {
			account: {},
			classe: {},
			owned: false,
			registered: false,
			
			error : ''
		}
	},
	created: async function() {
		var response = await fetch(`http://localhost/classes/${this.$route.query.classId}`);
		var json = await response.json();
		this.classe = json.response;

		this.account = await getAccount();

		for (const classe of this.account.classes) {
			if (classe.id == this.classe.id) {
				this.owned = true;
				this.registered = classe.clients_classes.registered;
			}
		}
	},
	methods: {
		pay: async function() {
			const response = await fetch(`http://localhost/classes/${this.classe.id}/pay`, {
				method: 'PUT'
			});
			const json = await response.json();

			if (json.success) {
				this.account = await json.response;
				this.owned = true;
			} else {
				this.error = json.response;
			}
		},
		register: async function() {
			const response = await fetch(`http://localhost/classes/${this.classe.id}/register`, {
				method: 'PUT'
			});
			const json = await response.json();
			
			if (json.success) {
				this.account = json.response;
				this.registered = true;
			} else {
				this.error = json.response;
			}
		},
		unregister: async function() {
			const response = await fetch(`http://localhost/classes/${this.classe.id}/unregister`, {
				method: 'PUT'
			});
			const json = await response.json();
			
			if (json.success) {
				this.account = json.response;
				this.registered = false;
			} else {
				this.error = json.response;
			}
		}
	}
}
</script>