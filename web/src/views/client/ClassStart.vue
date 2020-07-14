<template>
	<div>
		<HomeBar home="clientHome" /><br>

		<div id="form">
			<div>
				<h1>{{ classe.name }}</h1>
			</div>

			<div>
				<h2>{{ classe.description }}</h2>
			</div>

			<div>
				<h3 v-if="classe.private">Classe privée</h3>
				<h3 v-else>Classe privée</h3>
			</div>

			<div>
				<h3>Prix : {{ classe.price }} €</h3>
			</div>

			<div>
				<h3>Fonctionnalités :</h3>
				<label style="padding: 10px; font-size: 20px" v-for="fonctionnality of classe.fonctionnalities.split(';')" :key="fonctionnality">{{ fonctionnality }}</label>
			</div>

			<div>
				<h3>Date</h3>
				<h4>{{ classe.date }}</h4>
			</div>

			<div>
				<h3>Heure</h3>
				<h4>de {{ classe.beginHour }} à {{ classe.endHour }}</h4>
			</div>

			<div>
				<div v-if="!premium">
					<label style="font-size: 20px; color: red">Vous n'avez pas de compte premium</label>
				</div>
				<div v-else-if="classe.price > 0 && !owned">
					<button :disabled="account.card == null" v-on:click="pay">Payer le cours</button><br>
					<label v-if="account.card == null">Vous n'avez pas de carte enregistré</label> 
				</div>
				<div v-else>
					<button v-if="!registered" v-on:click="register">S'inscrire</button>
					<div v-else>
						<router-link :to="{ name: 'classroom', query: { classId: classe.id }}">
							<button>Démarrer</button>
						</router-link>
						<button v-on:click="unregister">Se désinscrire</button>
					</div>
				</div>
			</div>

			<div>
				<label style="color: red">{{ error }}</label>
			</div>
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
			
			error : '',

			premium: false
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

		for (const payment of this.account.payments) {
			if (payment.item == 'premium') {
				this.premium = true;
				break;
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

<style scoped>
	#form {
		text-align: center;
	}

	select {
		width: 10%;
		text-align: center;
	}

	button {
		padding: 20px;
	}
</style>