<template>
	<div>
		<HomeBar :account="account" />

		<label>Créer</label>
		<router-link to="/courseForm">
			<button>Créer cours</button>
		</router-link>
		
		<button>Créer classe virtuelle</button>

		<br>
		<label>Mes cours</label>
		<div>
			<div v-for="course of account.sentCourses" :key="course.id">
				<router-link :to="{ path: '/courseForm', query: { courseId: course.id } }">
					<button style="width: 150px; height: 100px" >{{ course.name }}</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getAccount } from '@/utils/promises.js';
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