<template>
	<div>
		<MenuBar />
		
		<div id="signIn">
			<h1>Connexion</h1>

			<form>
				<FormLine class="formLine" v-on:formLineChange="formLineChange"
					name="mail" label="Adresse mail" />

				<FormLine class="formLine" v-on:formLineChange="formLineChange"
					type="password" name="password" label="Mot de passe" />

				<button id="signInButton" v-on:click="signIn">Se connecter</button>
			</form>
		</div>

		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false" :message="message">
			<div slot="content" id="content">
				<label>{{ message }}</label>
			</div>
			<div slot="controls" id="controls">
				<button v-on:click="modalVisible = false">Fermer</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import MenuBar from '@/components/utils/MenuBar.vue';
import Modal from '@/components/utils/Modal.vue';
import FormLine from '@/components/utils/FormLine.vue';

import hashPassword from '@/utils/hashPassword';

export default {
	name: 'SignIn',
	data: function() {
		return {
			mail: 'professionnal@localhost',
			password: 'professionnal@localhost',

			modalVisible: false,
			message: null
		};
	},
	components: {
		MenuBar,
		Modal,
		FormLine
	},
	methods: {
		signIn: async function() {
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
					if (!json.success) {
						this.modalVisible = true;
						this.message = json.response;
					} else {
						if (json.response.type == 'client') {
							this.$router.push({
								name: 'clientHome'
							});
						} else if (json.response.type == 'professionnal') {
							this.$router.push({
								name: 'professionnalHome'
							});
						} else if (json.response.type == 'operator') {
							this.$router.push({
								name: 'operatorHome'
							});
						} else if (json.response.type == 'organization') {
							this.$router.push({
								name: 'organizationHome'
							});
						}
					}
				});
			});
		},
		formLineChange: function(change) {
			this[change[0]] = change[1];
		}
	}
};
</script>

<style scoped>
	#signIn {
		text-align: center;

		margin-top: 10%;
	}

	.formLine {
		padding: 10px;
	}

	#signInButton {
		width: 200px;
		height: 50px;
		background-color: mediumseagreen;
		color: white;
		font-size: 20px;
		border: none;
		border-radius: 10px;

		cursor: pointer;
	}
</style>