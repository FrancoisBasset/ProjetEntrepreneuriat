<template>
	<div>
		<HomeBar />

		<div id="root">
			<div id="list" :class="{ listWhenSelected: selectedCertification != null }">
				Rechercher une certification : <input type="text" v-model="searchField" />

				<table>
					<thead>
						<tr>
							<td>ID</td>
							<td>Nom</td>
							<td>Demandeur</td>
							<td>Date de demande</td>
							<td>Validé</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="certification of certifications" :key="certification.id" v-on:click="selectedCertification = certification">
							<td>
								<label>{{ certification.id }}</label>
							</td>
							<td>
								<label>{{ certification.name }}</label>
							</td>
							<td>
								<label>{{ certification.claimant.firstName }} </label>
								<label>{{ certification.claimant.lastName }}</label>
							</td>
							<td>
								<label>{{ new Date(certification.createdAt).toLocaleString() }}</label>
							</td>
							<td>
								<label v-if="certification.validated">✅</label>
								<label v-else>❌</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="info" :class="{ infoWhenSelected: selectedCertification != null }" v-if="selectedCertification != null">
				<h2>Liste des cours de la certification</h2>

				<div v-for="course of selectedCertification.courses" :key="course.id" style="border: 1px black solid; margin: 5px;">
					<CourseInfo :course="course" />
				</div>

				<button v-show="!selectedCertification.validated" v-on:click="validate">Valider</button>
			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import CourseInfo from '@/components/CourseInfo.vue';

export default {
	name: 'OperatorCertifications',
	components: {
		HomeBar,
		CourseInfo
	},
	data: function() {
		return {
			searchField: '',
			certifications: null,
			selectedCertification: null
		};
	},
	created: async function() {
		await this.setCertifications();
	},
	watch: {
		searchField: async function() {
			await this.setCertifications();
		}
	},
	methods: {
		setCertifications: async function() {
			const response = await fetch(`http://localhost/certifications/?search=${this.searchField}`);
			const json = await response.json();
			this.certifications = json.response;
		},
		validate: async function() {
			const response = await fetch(`http://localhost/certifications/${this.selectedCertification.id}`, {
				method: 'PUT'
			});
			const json = await response.json();
			this.selectedCertification = json.response;

			await this.setCertifications();
		}
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