<template>
	<div id="homeBar">
		<HomeBar :account="account" />
		<CourseEditor />
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';
import CourseEditor from '@/components/courseEditor/CourseEditor.vue';

export default {
	name: 'CourseEditorPage',
	components: {
		HomeBar,
		CourseEditor
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
	#homeBar {
		height: 10%;
	}
</style>