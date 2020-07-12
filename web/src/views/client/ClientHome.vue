<template>
	<div>
		<HomeBar home="clientHome" />

		<div id="home">
			<MyCourses :account="account" :courses="account.courses" />
			<ClientHomeClasses />
		</div>
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';
import MyCourses from '@/components/clientHome/MyCourses.vue';
import ClientHomeClasses from '@/components/clientHome/ClientHomeClasses.vue';

export default {
	name: 'ClientHome',
	components: {
		HomeBar,
		MyCourses,
		ClientHomeClasses
	},
	data: function() {
		return {
			account: {}
		};
	},
	created: async function() {
		this.account = await getAccount();
	}
}
</script>

<style scoped>
	#home {
		text-align: center;
	}
</style>