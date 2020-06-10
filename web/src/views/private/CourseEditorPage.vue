<template>
	<div>
		<div id="homeBar">
			<HomeBar :account="account" />
		</div>
		<CourseEditor id="editor" />
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

	#editor {
		height: 90%;
	}
</style>