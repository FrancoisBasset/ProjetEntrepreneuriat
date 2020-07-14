<template>
	<div class="div">
		<label class="title">Quelles sont les fonctionnalités ?</label><br><br>

		<h1>Classes virtuelles</h1>
		<h1>Cours en ligne</h1>
		<h1>Fiddle en ligne</h1>
		<h1>QCM</h1>
		<h1>Et surtout le suivi des cours grâce à notre télécommande reliée au site</h1>
	</div>
</template>

<script>
import VirtualClassroom from '@/components/homepage/features/VirtualClassroom.vue';
import OnlineCourse from '@/components/homepage/features/OnlineCourse.vue';
import CoursDeProgrammation from '@/components/homepage/features/CoursDeProgrammation.vue';
import ExercicesInnovants from '@/components/homepage/features/ExercicesInnovants.vue';

export default {
	name: 'Features',
	components: {
		VirtualClassroom,
		OnlineCourse,
		CoursDeProgrammation,
		ExercicesInnovants
	}
}
</script>

<style scoped>
	h1 {
		padding: 10px;
		background-color: tomato;
		color: white
	}
</style>