<template>
	<div>
		<HomeBar />

		<MyCourses :account="account" :courses="account.courses" />
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';
import MyCourses from '@/components/clientHome/MyCourses.vue';

export default {
	name: 'ClientHome',
	components: {
		HomeBar,
		MyCourses
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