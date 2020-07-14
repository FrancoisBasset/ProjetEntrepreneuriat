<template>
	<div>
		<h1>Mes cours</h1>
		<div>
			<div v-for="course of myCourses" :key="course.id">
				<router-link  :to="{ path: '/courseStart', query: { courseId: course.id } }">
					<button style="width: 150px; height: 100px;">{{ course.name }}</button>
				</router-link>
			</div>
		</div>

		<h1>Cours disponibles</h1>

		<div id="allCourses">
			<div v-for="course of availableCourses" :key="course.id">
				<router-link  :to="{ path: '/courseStart', query: { courseId: course.id } }">
					<button style="width: 150px; height: 100px;">{{ course.name }}</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getAccount, getCourses } from '@/utils/promises';

export default {
	name: 'ClientHomeCourses',
	data: function() {
		return {
			account: null,
			
			myCourses: null,
			availableCourses: null
		};
	},
	created: async function() {
		this.account = await getAccount();

		this.myCourses = this.account.courses;

		this.availableCourses = await getCourses();

		for (const myCourse of this.myCourses) {
			for (var c = 0; c < this.availableCourses.length; c++) {
				if (myCourse.id == this.availableCourses[c].id) {
					this.availableCourses.splice(c, 1);
					break;
				}
			}
		}
	},
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