<template>
	<div id="homebar">
		<router-link id="link" :to="{ name: home }">
			<Logo />
		</router-link>

		<label style="font-size: 20px">{{ account.firstName }} {{ account.lastName }}</label>
		
		<div id="buttons">
			<router-link :to="{ name: 'profile', params: { profile: account, home: home } }">
				<button id="profile">Mon profil</button>
			</router-link>
			<button id="disconnect" v-on:click="disconnect">Déconnexion</button>
		</div>
	</div>
</template>

<script>
import Logo from '@/components/utils/Logo.vue';
import { getAccount } from '@/utils/promises';

export default {
	name: 'Homebar',
	components: {
		Logo
	},
	props: [
		'home'
	],
	data: function() {
		return {
			account: {}
		};
	},
	created: async function() {
		this.account = await getAccount();
	},
	methods: {
		disconnect: function() {
			fetch('http://localhost/accounts/logout', {
				method: 'POST'
			}).then(response => {
				response.json().then(json => {
					if (json.success) {
						this.$router.push({
							name: 'HomePage'
						});
					}
				})
			})
		}
	}
}
</script>

<style scoped>
	#link {
		text-decoration: none;
	}

	#buttons {
		display: flex;
		float: right;
	}

	#profile {
		padding: 20px;
		border-radius: 10px;
		cursor: pointer;
		margin-right: 10px;
	}

	#disconnect {
		padding: 20px;
		border-radius: 10px;
		cursor: pointer;
	}
</style>