<template>
	<div style="text-align: center">
		<HomeBar home="professionnalHome" />

		<h1>Créer</h1>
		<router-link to="/courseForm">
			<button style="font-size: 30px; padding: 10px; margin: 5px">Cours</button>
		</router-link>
		
		<router-link to="/classForm">
			<button style="font-size: 30px; padding: 10px; margin: 5px">Classe virtuelle</button>
		</router-link>

		<h1>Mes cours</h1>
		<div>
			<div v-for="course of account.sentCourses" :key="course.id">
				<router-link :to="{ path: '/courseForm', query: { courseId: course.id } }">
					<button style="font-size: 30px;width: 250px; height: 150px; margin: 20px">{{ course.name }}</button>
				</router-link>
			</div>
		</div>

		<h1>Mes classes virtuelles</h1>
		<div>
			<div v-for="classe of account.givenClasses" :key="classe.id">
				<router-link :to="{ path: '/classForm', query: { classId: classe.id } }">
					<button style="font-size: 30px;width: 250px; height: 150px; margin: 20px">{{ classe.name }}</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises';
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'ProfessionnalHome',
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