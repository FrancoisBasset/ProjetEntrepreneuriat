<template>
	<div style="text-align: center; width: 100%">
		<HomeBar home="clientHome" />

		<div id="home">
			<ClientHomeCourses style="margin-right: 30%" />
			<ClientHomeClasses style="margin-left: 30%" />
		</div>
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';
import ClientHomeCourses from '@/components/clientHome/ClientHomeCourses.vue';
import ClientHomeClasses from '@/components/clientHome/ClientHomeClasses.vue';

export default {
	name: 'ClientHome',
	components: {
		HomeBar,
		ClientHomeCourses,
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
		display: inline-flex;
	}
</style>