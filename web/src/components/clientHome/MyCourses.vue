<template>
	<div>
		<h1>Mes cours</h1>
		
		<div>
			<div v-for="course of courses" :key="course.id">
				<button style="width: 150px; height: 100px" v-on:click="goToCourseStart(course)">{{ course.name }}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MyCourses',
	props: [
		'account',
		'courses'
	],
	methods: {
		goToCourseStart: function(course) {
			const account = this.account;

			this.$router.push({
				name: 'courseStart',
				params: {
					account,
					course
				},
				props: true
			});
		}
	}
}
</script>