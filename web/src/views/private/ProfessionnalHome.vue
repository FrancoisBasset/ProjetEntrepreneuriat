<template>
	<div>
		<HomeBar v-if="account != null" :firstName="account.firstName" :lastName="account.lastName" />

		<label>Créer</label>
		<router-link to="/createCourse">
			<button>Créer cours</button>
		</router-link>
		
		<button>Créer classe virtuelle</button>
	</div>
</template>

<script>
import getAccount from '@/utils/getAccount.js'
import HomeBar from '@/components/HomeBar.vue';

export default {
	name: 'ProfessionnalHome',
	components: {
		HomeBar
	},
	asyncComputed: {
		account: async function() {
			return getAccount();
		}
	}
}
</script>