<template>
	<div style="text-align: center">
		<HomeBar home="organizationHome" />


		<h2>Créer un compte temporaire</h2><br>
		
		<div>
			<label style="font-size: 20px">Professeur </label><input type="radio" value="professionnal" v-model="type" />
			<label style="font-size: 20px">Apprenant </label><input type="radio" value="client" v-model="type" />
		</div><br>

		<div>
			<label style="font-size: 20px">Adresse mail : </label>
			<input type="text" v-model="mailAddress" />
		</div><br>

		<div>
			<button v-on:click="createAccount">Créer le compte temporaire</button>
		</div><br>

		<div>
			<label style="color: red">{{ error }}</label>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import hashPassword from '@/utils/hashPassword';

export default {
	name: 'OrganizationHome',
	components: {
		HomeBar
	},
	data: function() {
		return {
			type: null,
			mailAddress: '',

			error: ''
		};
	},
	methods: {
		createAccount: async function() {
			this.error = '';

			if (this.type == null) {
				this.error = 'Le type de compte nèst pas choisi';
				return;
			}

			if (this.mailAddress.trim() == '') {
				this.error = 'L\'adresse mail est vide';
				return;
			}

			const hash = await hashPassword(this.mailAddress);

			const response = await fetch('http://localhost/accounts', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					firstName: this.mailAddress,
					lastName: this.mailAddress,
					organizationName: '',
					mail: this.mailAddress,
					hash: hash,
					type: this.type,
					permanent: false
				})
			});
			const json = await response.json();

			if (!json.success) {
				this.error = json.response;
			}
		}
	}
}
</script>