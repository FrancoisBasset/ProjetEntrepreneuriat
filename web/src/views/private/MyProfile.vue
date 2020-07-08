<template>
	<div>
		<HomeBar />

		<div>
			<div v-if="!willUpdatePassword">
				<button v-on:click="willUpdatePassword = true">Modifier le mot de passe</button>
			</div>
			<div v-else>
				Ancien mot de passe : <input type="password" v-model="oldPassword" />
				<br>

				Nouveau mot de passe : <input type="password" v-model="newPassword1" />
				<br>
				Confirmer le mot de passe : <input type="password" v-model="newPassword2" />
				<br>

				<label style="color: red">{{ errorChangePassword }}</label><br>
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
			Adresse mail : <input type="text" v-model="profile.mail" />
		</div>

		<div>
			<button v-on:click="updateProfile">Modifier le compte</button>
		</div>

		<div>
			<button>Supprimer le compte</button>
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
			newPassword2: ''
		};
	},
	created: function() {
		this.profile = this.$route.params.profile;

		console.log(this.profile);
		
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
		}
	}
}
</script>