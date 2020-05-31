<template>
	<div>
		<MenuBar />
		
		<div id="signIn">
			<h1>Connexion</h1>

			<form>
				<label>Adresse mail</label>
				<br>
				<input type="text" v-model="mail" />
				<br>
				<label>Mot de passe</label>
				<br>
				<input type="password" v-model="password" />
				<br>
				<button v-on:click="signin">Se connecter</button>
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
	name: 'SignIn',
	data: function() {
		return {
			mail: 'client@localhost',
			password: 'hash',

			modalVisible: false,
			message: null
		};
	},
	components: {
		MenuBar,
		Modal
	},
	methods: {
		signin: async function() {
			fetch('http://localhost/accounts/signin', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					mail: this.mail,
					hash: await hashPassword(this.password)
				})
			}).then(response => {
				response.json().then(json => {
					this.modalVisible = true;
					this.message = json.response;
				});
			})
			
		}
	}
};
</script>

<style scoped>
	#signIn {
		text-align: center;

		margin-top: 10%;
	}
</style>