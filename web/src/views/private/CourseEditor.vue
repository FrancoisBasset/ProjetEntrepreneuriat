<template>
	<div>
		<HomeBar :account="account" />
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises.js';
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'CourseEditor',
	components: {
		HomeBar
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

</style>