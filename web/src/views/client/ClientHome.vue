<template>
	<div>
		<HomeBar home="clientHome" />

		<MyCourses :account="account" :courses="account.courses" />
		<AllClasses />
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';
import MyCourses from '@/components/clientHome/MyCourses.vue';
import AllClasses from '@/components/clientHome/AllClasses.vue';

export default {
	name: 'ClientHome',
	components: {
		HomeBar,
		MyCourses,
		AllClasses
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