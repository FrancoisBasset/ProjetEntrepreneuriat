<template>
	<div>
		<HomeBar v-if="account != null" :firstName="account.firstName" :lastName="account.lastName" />

		<label>Créer</label>
		<router-link to="/courseForm">
			<button>Créer cours</button>
		</router-link>
		
		<button>Créer classe virtuelle</button>

		<br>
		<label>Mes cours</label>
		<div v-if="account != null">
			<div v-for="course of account.sentCourses" :key="course.id">
				<router-link :to="{ path: '/courseForm', query: { courseId: course.id } }">
					<label >{{ course.name }}</label>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import getAccount from '@/utils/getAccount.js'
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'ProfessionnalHome',
	components: {
		HomeBar
	},
	asyncComputed: {
		account: async function() {
			return getAccount();
		}
	}
}
</script>