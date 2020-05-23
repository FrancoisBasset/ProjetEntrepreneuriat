<template>
	<div>
		<MenuBar />
		
		<div id="signUp">
			<h1>Créer un compte</h1>

			<form>
				<label>Adresse mail  </label>
				<br>
				<input type="text" v-model="mail" />
				<br>
				
				<label>Mot de passe  </label>
				<br>
				<input type="password" v-model="firstPassword" />
				<br>

				<label>Confirmer le mot de passe</label>
				<br>
				<input type="password" v-model="secondPassword" />
				<br>

				<label>Type de compte  </label>
				<br>
				<input type="radio" v-model="type" value="client" />
				<label>Client</label>
				<br>
				<input type="radio" v-model="type" value="professionnal" />
				<label>Professionnel</label>
				<br>
				<input type="radio" v-model="type" value="organization" />
				<label>Organisation</label>

				<br>
				<button v-on:click="createAccount">Créer le compte</button>
			</form>
		</div>
		
		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false" v-bind:message="message"/>
	</div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import Modal from '@/components/Modal.vue';

async function hashPassword(password) {
	const msgUint8 = new TextEncoder().encode(password);                           // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
	const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hash;
}

export default {
	name: 'SignUp',
	components: {
		MenuBar,
		Modal
	},
	data: function() {
		return {
			mail: 'client@localhost',
			firstPassword: 'hash',
			secondPassword: 'hash',
			type: 'client',
			
			modalVisible: false,
			message: null
		}
	},
	methods: {
		createAccount: async function() {
			if (this.mail == '') {
				this.modalVisible = true;
				this.message = 'L\'adresse mail n\'est pas renseignée !';
				return;
			}

			if (this.firstPassword != this.secondPassword) {
				this.modalVisible = true;
				this.message = 'Les mots de passe ne sont pas identiques'
				return;
			}

			const hash = await hashPassword(this.firstPassword);

			fetch('http://localhost/accounts', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					mail: this.mail,
					hash: hash,
					type: this.type,
					permanent: true
				})
			}).then(response => {
				response.json().then(json => {
					this.modalVisible = !json.success;
					this.message = json.response;
				});
			});
		}
	}
};
</script>

<style scoped>
	#signUp {
		text-align: center;

		margin-top: 10%;
	}
</style>