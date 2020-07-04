<template>
	<div>
		<h2>{{ course.name }}</h2>
		<label>Difficulté {{ course.difficulty }}/5</label>
		<div v-if="course.objectives != ''">
			<label>Objectifs : </label>
			<label v-for="objective of course.objectives" :key="objective">{{ objective }}</label>
		</div>
		<div v-if="course.clients_courses != null">
			<label v-if="course.clients_courses.favorite">Favoris ✅</label>
			<label v-else>Favoris ❌</label><br>
			<label v-if="course.clients_courses.started">Commencé ✅</label>
			<label v-else>Commencé ❌</label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseInfo',
	props: [
		'course'
	]
}
</script>