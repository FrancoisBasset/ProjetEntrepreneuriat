<template>
	<div>
		<HomeBar />

		<div id="root">
			<div id="list" :class="{ listWhenSelected: selectedUser != null }">
				<table>
					<thead>
						<tr>
							<td>ID</td>
							<td>Prénom</td>
							<td>Nom</td>
							<td>Organisation</td>
							<td>Adresse mail</td>
							<td>Permanent</td>
							<td>Type de compte</td>
							<td>Date de création de compte</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user of users" :key="user.id" v-on:click="selectedUser = user" v-if="user.type != 'operator'">
							<td>
								<label>{{ user.id }}</label>
							</td>
							<td>
								<label>{{ user.firstName }}</label>
							</td>
							<td>
								<label>{{ user.lastName }}</label>
							</td>
							<td>
								<label>{{ user.organizationName }}</label>
							</td>
							<td>
								<label>{{ user.mail }}</label>
							</td>
							<td>
								<label v-if="user.permanent">Oui</label>
								<label v-else>Non</label>
							</td>
							<td>
								<label>{{ user.type }}</label>
							</td>
							<td>
								<label>{{ new Date(user.createdAt).toLocaleString() }}</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="info" :class="{ infoWhenSelected: selectedUser != null }" v-if="selectedUser != null">
				<div v-if="selectedUser.type == 'client'">
					<h2>Liste des cours suivis</h2>
					<div v-for="course of selectedUser.courses" :key="course.id" style="border: 1px black solid; margin: 5px;">
						<CourseInfo :course="course" />
					</div>
				</div>
				<div v-if="selectedUser.type == 'professionnal'">
					<h2>Liste des cours dispensés</h2>
					<div v-for="course of selectedUser.sentCourses" :key="course.id" style="border: 1px black solid; margin: 5px;">
						<CourseInfo :course="course" />
					</div>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import CourseInfo from '@/components/CourseInfo.vue';

export default {
	name: 'OperatorUsers',
	components: {
		HomeBar,
		CourseInfo
	},
	data: function() {
		return {
			users: null,
			selectedUser: null
		};
	},
	created: async function() {
		var response = await fetch(`http://localhost/accounts/all`);
		var json = await response.json();
		this.users = json.response;
	}
}
</script>

<style scoped>
	#root {
		display: inline-flex;
		width: 100%;
		height: 100%;
	}

	#list {
		border: 1px black solid;
		border-radius: 15px;
		padding: 10px;

		width: 95%;
		height: 800px;

		margin-left: 1%;
		overflow: scroll;
	}

	.listWhenSelected {
		width: 48%;
	}

	.infoWhenSelected {
		border: 1px black solid;
		width: 48%;
		height: 800px;

		margin-left: 2%;
		overflow: scroll;
	}
</style>