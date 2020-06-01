<template>
	<div id="certificationDiv">
		<div id="certificationName">
			<label>{{ certification.name }}</label>
		</div>
		<div id="certificationCourses">
			<h2>Cours</h2>
			<div v-for="course in this.courses" v-bind:key="course.id">
				<label>{{ course.name }}</label>
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	name: 'Certification',
	props: [
		'certification'
	],
	data: function() {
		return {
			courses: null
		};
	},
	created: async function () {
		this.loadCoursesFromCertification();
	},
	methods: {
		loadCoursesFromCertification: async function() {
			this.courses = [];

			for (const course of this.certification.courses) {
				const response = await fetch(`http://localhost/sections/courses/${course.id}`);
				const json = await response.json();

				this.courses.push(json.response);
			}
		}
	}
}
</script>

<style scoped>
	#certificationDiv {
		display: inline-block;
		border: 1px solid;
	}

	#certificationName {
		font-size:  40px;
		
		border-bottom: 1px solid;
	}

	#certificationCourses {
		height: 200px;;
	}
</style>