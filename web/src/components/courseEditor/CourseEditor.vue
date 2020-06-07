<template>
	<div>
		<CourseTree id="courseTree" :chapters="course.chapters" />
	</div>
</template>

<script>
import { getAccount, getCourse } from '@/utils/promises';
import CourseTree from '@/components/courseEditor/CourseTree.vue';

export default {
	name: 'CourseEditor',
	components: {
		CourseTree
	},
	data: function() {
		return {
			account: {},
			course: {}
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.course = await getCourse(this.$route.query.courseId);
	}
}
</script>

<style scoped>
	#courseTree {
		position: fixed;
		display: inline-block;
		border: 1px solid;
		height: 95%;
		overflow: scroll;
	}
</style>