<template>
	<div>
		<HomeBar />

		<div>
			<h2>Créer un domaine</h2>

			Nom du domaine : <input type="text" v-model="newDomain.name" /><br>
			Image du domaine : <input type="file" v-on:change="loadNewDomainImage" /><br>
			<button v-on:click="createDomain">Créer le domaine</button>
		</div>

		<hr>

		<div>
			<h2>Modifier un domaine</h2>

			<select v-model="selectedDomain">
				<option v-for="domain in domains" :key="domain.id" :value="domain">{{ domain.name }}</option>
			</select>			

			<div v-if="selectedDomain != null">
				Nom du domaine : <input type="text" v-model="selectedDomainName" /><br><br>
				Image du domaine : <input type="file" v-on:change="loadDomainImage" /><br>
				<img :src="image" height="100" /><br>

				<button v-on:click="updateDomainName">Modifier le domaine</button>
			</div>
		</div>

		<hr>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'OperatorFormations',
	components: {
		HomeBar
	},
	data: function() {
		return {
			newDomain: {
				name: '',
				image: null
			},
			domains: null,
			selectedDomain: null,
			selectedDomainImage: null,
			selectedDomainName: null,
			image: null
		};
	},
	created: async function() {
		this.setDomains();
	},
	watch: {
		selectedDomain: function() {
			this.selectedDomainName = this.selectedDomain.name;

			fetch(`http://localhost/assets/images/${this.selectedDomain.image}`).then(r => {
				r.blob().then(blob => {
					this.selectedDomainImage = new File([blob], this.selectedDomain.image, blob);

					const reader = new FileReader();

					reader.onload = e => {
						this.image = e.target.result;
					};

					reader.readAsDataURL(this.selectedDomainImage);
				});
			});
		}
	},
	methods: {
		setDomains: async function() {
			const response = await fetch('http://localhost/sections/domains');
			const json = await response.json();
			this.domains = json.response;
		},
		createDomain: async function() {
			const formData = new FormData();
			formData.append('name', this.newDomain.name);
			formData.append('image', this.newDomain.image);

			await fetch('http://localhost/sections/domains', { method: 'POST', body: formData });

			await this.setDomains();
		},
		loadNewDomainImage: function(e) {
			this.newDomain.image = e.target.files[0];
		},
		loadDomainImage: function(e) {
			this.selectedDomainImage = e.target.files[0];

			const reader = new FileReader();

			reader.onload = e => {
				this.image = e.target.result;
			};

			reader.readAsDataURL(this.selectedDomainImage);
		},
		updateDomainName: async function() {
			const formData = new FormData();
			formData.append('name', this.selectedDomainName);
			formData.append('image', this.selectedDomainImage);

			await fetch(`http://localhost/sections/domains/${this.selectedDomain.id}`, {
				method: 'PUT',
				body: formData
			});

			await this.setDomains();
		},
		deleteDomain: function() {
			
		}
	}
}
</script>

<style scoped>

</style>