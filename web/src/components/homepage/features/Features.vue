<template>
	<div class="div">
		<label class="title">Quelles sont les fonctionnalités ?</label>

		<div>
			<table>
				<tr>
					<td>
						<VirtualClassroom />
					</td>
					<td>
						<OnlineCourse />
					</td>
				</tr>
				<tr>
					<td>
						<CoursDeProgrammation />
					</td>
					<td>
						<ExercicesInnovants />
					</td>
				</tr>
			</table>
		</div>
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
	table {
		width: 70%;
		margin-left: 15%;
		margin-right: 15%;
	}
</style>