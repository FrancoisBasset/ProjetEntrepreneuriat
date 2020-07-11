<template>
	<div>
		<HomeBar />

		<h2>Créer</h2>
		<router-link to="/courseForm">
			<button>Créer cours</button>
		</router-link>
		
		<router-link to="/classForm">
			<button>Créer classe virtuelle</button>
		</router-link>

		<hr>
		<h2>Mes cours</h2>
		<div>
			<div v-for="course of account.sentCourses" :key="course.id">
				<router-link :to="{ path: '/courseForm', query: { courseId: course.id } }">
					<button style="width: 150px; height: 100px">{{ course.name }}</button>
				</router-link>
			</div>
		</div>

		<hr>
		<h2>Mes classes virtuelles</h2>
		<div>
			<div v-for="classe of account.classes" :key="classe.id">
				<router-link :to="{ path: '/classForm', query: { classId: classe.id } }">
					<button style="width: 150px; height: 100px">{{ classe.name }}</button>
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