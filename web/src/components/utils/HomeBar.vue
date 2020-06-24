<template>
	<div id="homebar">
		<label>{{ account.firstName }} {{ account.lastName }}</label>
		
		<router-link id="link" :to="{ name: 'clientHome' }">
			<Logo />
		</router-link>

		<button v-on:click="disconnect">Déconnexion</button>
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
	#homebar {
		text-align: center;
	}

	#link {
		text-decoration: none;
	}
</style>