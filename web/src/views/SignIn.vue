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

		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false" v-bind:message="message"/>
	</div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import Modal from '@/components/Modal.vue';
import FormLine from '@/components/FormLine.vue';

import hashPassword from '../utils/hashPassword';

export default {
	name: 'SignIn',
	data: function() {
		return {
			mail: null,
			password: null,

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
					this.modalVisible = true;
					this.message = json.response;
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