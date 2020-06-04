<template>
	<div>
		<MenuBar />
		
		<div id="signUp">
			<h1>Créer un compte</h1>

			<form>
				<h5>Type de compte</h5>
				
				<div id="radioTypeDiv">
					<AccountTypeChoice v-on:click.native="clientTypeClick"
						title="Client" description="Elève, étudiant, ou toute personne qui souhaite suivre nos cours" :selected="type == 'client'" />

					<AccountTypeChoice v-on:click.native="professionnalTypeClick"
						title="Professionnel" description="Professionnel qui souhaite dispenser leurs cours aux élèves" :selected="type == 'professionnal'" />

					<AccountTypeChoice v-on:click.native="organizationTypeClick"
						title="Organisation" description="Entreprise ou organisation qui souhaite offrir des formations à leurs collaborateurs" :selected="type == 'organization'" />
				</div>

				<div id="formLines">
					<FormLine class="formLine" v-show="type == 'client' || type == 'professionnal'" v-on:formLineChange="formLineChange"
						warning="true" name="firstName" label="Prénom" />

					<FormLine class="formLine" v-show="type == 'client' || type == 'professionnal'" v-on:formLineChange="formLineChange"
						warning="true" name="lastName" label="Nom" />

					<FormLine class="formLine" v-show="type == 'organization'" v-on:formLineChange="formLineChange"
						warning="true" name="organizationName" label="Nom de l'organization" />

					<FormLine class="formLine" v-on:formLineChange="formLineChange"
						warning="true" name="mail" label="Adresse mail" />

					<FormLine class="formLine" v-on:formLineChange="formLineChange"
						type="password" warning="true" name="firstPassword" label="Mot de passe" />
						
					<FormLine class="formLine" v-on:formLineChange="formLineChange"
						type="password" warning="true" name="secondPassword" label="Confirmer le mot de passe" />
				</div>

				<button id="createAccountButton" v-on:click="createAccount">Créer le compte</button>
			</form>
		</div>
		
		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false">
			<div slot="content" id="content">
				<label>{{ message }}</label>
			</div>
		</Modal>
	</div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import Modal from '@/components/Modal.vue';
import FormWarning from '@/components/FormWarning.vue';
import AccountTypeChoice from '@/components/AccountTypeChoice.vue';
import FormLine from '@/components/FormLine.vue';

import hashPassword from '../../utils/hashPassword';

export default {
	name: 'SignUp',
	components: {
		MenuBar,
		Modal,
		FormWarning,
		AccountTypeChoice,
		FormLine
	},
	data: function() {
		return {
			firstName: null,
			lastName: null,
			organizationName: null,
			type: 'client',
			mail: null,
			firstPassword: null,
			secondPassword: null,

			modalVisible: false,
			message: null
		}
	},
	methods: {
		createAccount: async function() {
			var ok = true;
			
			if (this.mail == null || this.mail == '') {
				ok = false;
			}

			if (this.firstPassword == null || this.firstPassword == '') {
				ok = false;
			}

			if (this.secondPassword == null || this.secondPassword == '') {
				ok = false;
			}

			if (this.type == 'organization') {
				if (this.organizationName == null || this.organizationName == '') {
					ok = false;
				}
			} else {
				if (this.firstName == null || this.firstName == '') {
					ok = false;
				}

				if (this.lastName == null || this.lastName == '') {
					ok = false;
				}
			}

			if (!ok) {
				this.modalVisible = true;
				this.message = 'Certaines informations ne sont pas renseignées !';
				return;
			}

			if (this.firstPassword != this.secondPassword) {
				this.modalVisible = true;
				this.message = 'Les mots de passe ne sont pas identiques !';
				return;
			}

			if (this.type == 'organization') {
				this.firstName = null;
				this.lastName = null;
			} else {
				this.organizationName = null;
			}

			const hash = await hashPassword(this.firstPassword);

			fetch('http://localhost/accounts', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					firstName: this.firstName,
					lastName: this.lastName,
					organizationName: this.organizationName,
					mail: this.mail,
					hash: hash,
					type: this.type,
					permanent: true
				})
			}).then(response => {
				response.json().then(json => {
					if (json.success) {

					} else {
						this.modalVisible = !json.success;
						this.message = json.response;
					}
				});
			});
		},
		clientTypeClick: function() {
			this.type = 'client';
		},
		professionnalTypeClick: function() {
			this.type = 'professionnal';
		},
		organizationTypeClick: function() {
			this.type = 'organization';
		},
		formLineChange: function(change) {
			this[change[0]] = change[1];
		}
	}
};
</script>

<style scoped>
	#signUp {
		text-align: center;

		margin-top: 5%;
	}

	#radioTypeDiv {
		display: inline-flex;
		text-align: center;
	}

	#formLines {
		margin-top: 20px;
	}

	.formLine {
		padding: 10px;
	}

	#createAccountButton {
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