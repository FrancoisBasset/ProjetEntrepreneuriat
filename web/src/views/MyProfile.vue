<template>
	<div>
		<HomeBar :home="home" />

		<div id="form">
			<div>
				<div v-if="!willUpdatePassword">
					<button v-on:click="willUpdatePassword = true">Modifier le mot de passe</button>
				</div>
				<div v-else>
					<div>
						Ancien mot de passe : <input type="password" v-model="oldPassword" />
					</div>

					<div>
						Nouveau mot de passe : <input type="password" v-model="newPassword1" />
					</div>

					<div>
						Confirmer le mot de passe : <input type="password" v-model="newPassword2" />
					</div>

					<div>
						<label class="error">{{ errorChangePassword }}</label>
					</div>

					<button v-on:click="resetPasswordForm">Annuler</button>
					<button v-on:click="updatePassword">Confirmer</button>
				</div>
			</div>

			<div>
				Prénom : <input type="text" v-model="profile.firstName" />
			</div>

			<div>
				Nom : <input type="text" v-model="profile.lastName" />
			</div>

			<div>
				Nom de l'organisation : <input type="text" v-model="profile.organization" />
			</div>

			<div>
				Adresse mail : <input type="text" v-model="profile.mail" size="50" />
			</div>

			<div>
				<button v-on:click="updateProfile">Modifier le compte</button>
			</div>

			<div>
				<button v-if="profile.type == 'client'" v-on:click="deleteProfile">Supprimer le compte</button>
			</div>

			<div v-if="profile.type == 'client'">
				<hr>

				<h2>Améliorer le compte</h2>

				<div v-if="profile.card == null">
					<button v-if="!willAddCard" v-on:click="willAddCard = true">Ajouter une carte bancaire</button>
					<button v-else v-on:click="willAddCard = false">Annuler l'ajout</button>
					
					<div v-if="willAddCard">
						<div>
							Numéro de carte : <input type="text" v-model="card.code" maxlength="16" />
						</div>
						<div>
							Date d'expiration : <input type="text" v-model="card.expiryDate" maxlength="5" />
						</div>
						<button v-on:click="addCard">Ajouter la carte</button>
					</div>
				</div>
				<div v-else>
					<div>
						<label>Solde {{ profile.card.balance }}€</label>
					</div>
					<div>
						<button v-on:click="deleteCard">Supprimer la carte bancaire</button>
					</div>
				</div>
				
				<br>
				<label style="color: green" v-if="mediumActivated">Compte medium activée</label>
				<button v-else :disabled="profile.card == null" v-on:click="getMedium">Obtenir un compte Medium</button><br>
				
				<label style="color: green" v-if="premiumActivated">Compte premium activée</label>
				<button v-else :disabled="profile.card == null" v-on:click="getPremium">Obtenir un compte Premium</button>
			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import hashPassword from '@/utils/hashPassword';

export default {
	name: 'MyProfile',
	components: {
		HomeBar
	},
	data: function() {
		return {
			profile: null,

			willUpdatePassword: false,
			errorChangePassword: '',
			oldPassword: '',
			newPassword1: '',
			newPassword2: '',

			willAddCard: false,
			card: {
				code: '',
				expiryDate: ''
			},

			mediumActivated: false,
			premiumActivated: false,

			home: null
		};
	},
	created: function() {
		this.profile = this.$route.params.profile;
		this.home = this.$route.params.home;

		if (this.profile.type == 'client') {
			this.updatePayments();
		}
	},
	methods: {
		resetPasswordForm: function() {
			this.willUpdatePassword = false;
			this.oldPassword = '';
			this.newPassword1 = '';
			this.newPassword2 = '';
			this.errorChangePassword = '';
		},
		updatePassword: async function() {
			if (this.newPassword1.trim() == '' || this.newPassword2.trim() == ''
				|| this.newPassword1 != this.newPassword2) {
				this.errorChangePassword = 'Les nouveaux mots de passe ne sont pas corrects ou identiques';
			} else if (this.oldPassword == this.newPassword1) {
				this.errorChangePassword = 'L\'ancien mot de passe est identique au nouveau mot de passe';
			} else {
				const response = await fetch(`http://localhost/accounts/password`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						oldPassword: await hashPassword(this.oldPassword),
						newPassword: await hashPassword(this.newPassword1)
					})
				});

				const json = await response.json();				

				if (json.success) {
					this.resetPasswordForm();
				} else {
					this.errorChangePassword = json.response;
				}
			}
		},
		updateProfile: async function() {
			const response = await fetch(`http://localhost/accounts`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					firstName: this.profile.firstName,
					lastName: this.profile.lastName,
					organizationName: this.profile.organizationName,
					mail: this.profile.mail
				})
			});

			const json = await response.json();
			this.profile = json.response;
		},
		deleteProfile: async function() {
			await fetch('http://localhost/accounts', {
				method: 'DELETE'
			});

			await fetch('http://localhost/accounts/logout', {
				method: 'POST'
			});
			
			this.$router.push({
				name: 'HomePage'
			});
		},
		addCard: async function() {
			const response = await fetch('http://localhost/accounts/card', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					code: await hashPassword(this.card.code),
					expiryDate: this.card.expiryDate
				})
			});
			const json = await response.json();

			this.profile = json.response;
			this.willAddCard = false;
			this.card.code = '';
			this.card.expiryDate = '';
		},
		deleteCard: async function() {
			const response = await fetch('http://localhost/accounts/card', {
				method: 'DELETE'
			});
			const json = await response.json();

			this.profile = json.response;
		},
		getMedium: async function() {
			const response = await fetch('http://localhost/accounts/pay', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					amount: 9.99,
					item: 'medium'
				})
			});
			const json = await response.json();

			this.profile = json.response;

			this.updatePayments();
		},
		getPremium: async function() {
			const response = await fetch('http://localhost/accounts/pay', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					amount: 49.99,
					item: 'premium'
				})
			});

			const json = await response.json();

			this.profile = json.response;

			this.updatePayments();
		},
		updatePayments: function() {
			for (const payment of this.profile.payments) {
				if (payment.item == 'medium') {
					this.mediumActivated = true;
				}

				if (payment.item == 'premium') {
					this.premiumActivated = true;
				}
			}
		}
	}
}
</script>

<style scoped>
	#form {
		text-align: center;
		margin-top: 50px;
	}

	button, input {
		padding: 5px;
		margin: 5px;
	}

	.error {
		color: red;
	}
</style>