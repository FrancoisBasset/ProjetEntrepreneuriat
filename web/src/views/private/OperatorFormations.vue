<template>
	<div>
		<HomeBar />

		<div>
			<h2>Domaines</h2>

			Créer <input type="radio" value="create" v-model="domain.mode" />
			Modifier <input type="radio" value="update" v-model="domain.mode" /><br>

			<div v-if="domain.mode == 'update'">
				<select v-model="domain.selected">
					<option v-for="d in domains" :key="d.id" :value="d">{{ d.name }}</option>
				</select><br>
			</div>

			Nom du domaine : <input type="text" v-model="domain.name" /><br>
			Image du domaine : <input type="file" v-on:change="loadDomainImage" /><br>
			<img v-if="domain.imageData != null" :src="domain.imageData" height="100" /><br>

			<button v-if="domain.mode == 'create'" v-on:click="createDomain">Créer le domaine</button>
			<button v-if="domain.mode == 'update'" v-on:click="updateDomain">Modifier le domaine</button>
			<button v-if="domain.mode == 'update'" v-on:click="deleteDomain">Supprimer le domaine</button>
		</div>

		<hr>

		<div>
			<h2>Branches</h2>

			Créer <input type="radio" value="create" v-model="branch.mode" />
			Modifier <input type="radio" value="update" v-model="branch.mode" /><br>

			<div v-if="branch.mode == 'update'">
				Branche : <select v-model="branch.selected">
					<option v-for="branch in branches" :key="branch.id" :value="branch" selected="branch.selected">{{ branch.name }}</option>
				</select><br>
			</div>

			Domaine : <select v-model="branch.domain">
				<option v-for="domain in domains" :key="domain.id" :value="domain">{{ domain.name }}</option>
			</select>
			<br>
			Nom de la branche : <input type="text" v-model="branch.name" /><br>
			Image de la branche : <input type="file" v-on:change="loadBranchImage" /><br>
			<img v-if="branch.imageData != null" :src="branch.imageData" height="100" /><br>
			
			<button v-if="branch.mode == 'create'" v-on:click="createBranch">Créer la branche</button>
			<button v-if="branch.mode == 'update'" v-on:click="updateBranch">Modifier la branche</button>
			<button v-if="branch.mode == 'update'" v-on:click="deleteBranch">Supprimer la branche</button>
		</div>

		<hr>

		<h2>Déplacer les branches</h2>

		<div>
			Domaine : <select v-model="selectedDomain">
				<option v-for="domain in domains" :key="domain.id" :value="domain">{{ domain.name }}</option>
			</select>
		</div>
		
		<div id="manager">
			<div>
				<select v-model="branchToAdd" size="10" style="width: 200px">
					<option v-for="branch in unselectedBranches" :key="branch.id" :value="branch">{{ branch.name }}</option>
				</select>
			</div>
			<div>
				<div>
					<button v-on:click="addBranch">></button>
				</div>
			</div>
			<div>
				<select v-if="selectedDomain != null" size="10" style="width: 200px">
					<option v-for="branch in selectedDomain.branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
				</select>
			</div>
		</div>

		<hr>

		<div>
			<h2>Cours</h2>

			<select v-model="selectedCourse">
				<option v-for="course of courses" :key="course.id" :value="course">{{ course.name }}</option>
			</select>

			<button v-on:click="deleteCourse">Supprimer le cours</button>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import { getDomains, getBranches, getCourses } from '@/utils/promises';

export default {
	name: 'OperatorFormations',
	components: {
		HomeBar
	},
	data: function() {
		return {
			domains: null,
			branches: null,

			domain: {
				name: '',
				image: null,
				imageData: null,

				mode: 'create',
				selected: null
			},

			branch: {
				domain: null,
				name: '',
				image: null,
				imageData: null,

				mode: 'create',
				selected: null
			},

			branchToAdd: null,
			selectedDomain: null,
			unselectedBranches: [],

			courses: null,
			selectedCourse: null
		};
	},
	created: async function() {
		this.domains = await getDomains();
		this.branches = await getBranches();
		this.courses = await getCourses();
	},
	watch: {
		"domain.mode": async function() {
			await this.reset();
		},
		"domain.selected": function() {
			if (this.domain.selected == null) {
				return;
			}

			this.domain.name = this.domain.selected.name;

			fetch(`http://localhost/assets/images/${this.domain.selected.image}`).then(r => {
				r.blob().then(blob => {
					this.domain.image = new File([blob], this.domain.selected.image, blob);

					const reader = new FileReader();

					reader.onload = e => {
						this.domain.imageData = e.target.result;
					};

					reader.readAsDataURL(this.domain.image);
				});
			});
		},
		"branch.mode": async function() {
			await this.reset();
		},
		"branch.selected": function() {
			if (this.branch.selected == null) {
				return;
			}

			this.branch.name = this.branch.selected.name;

			for (const domain of this.domains) {
				if (domain.id == this.branch.selected.domain.id) {
					this.branch.domain = domain;
					break;
				}
			}

			fetch(`http://localhost/assets/images/${this.branch.selected.image}`).then(r => {
				r.blob().then(blob => {
					this.branch.image = new File([blob], this.branch.selected.image, blob);

					const reader = new FileReader();

					reader.onload = e => {
						this.branch.imageData = e.target.result;
					};

					reader.readAsDataURL(this.branch.image);
				});
			});
		},
		selectedDomain: function() {
			this.setUnselectedBranches();
		}
	},
	methods: {
		reset: async function() {
			this.domain.selected = null;
			this.domain.name = '';
			this.domain.image = null;
			this.domain.imageData = null;

			this.branch.selected = null;
			this.branch.domain = null;
			this.branch.name = '';
			this.branch.image = null;
			this.branch.imageData = null;
			
			this.domains = await getDomains();
			this.branches = await getBranches();
		},
		createDomain: async function() {
			const formData = new FormData();
			formData.append('name', this.domain.name);
			formData.append('image', this.domain.image);

			await fetch('http://localhost/sections/domains', { method: 'POST', body: formData });

			await this.reset();
		},
		loadDomainImage: function(e) {
			this.domain.image = e.target.files[0];

			const reader = new FileReader();

			reader.onload = e => {
				this.domain.imageData = e.target.result;
			};

			reader.readAsDataURL(this.domain.image);
		},
		updateDomain: async function() {
			const formData = new FormData();
			formData.append('name', this.domain.name);
			formData.append('image', this.domain.image);

			await fetch(`http://localhost/sections/domains/${this.domain.selected.id}`, {
				method: 'PUT',
				body: formData
			});

			this.domains = await getDomains();
			this.branches = await getBranches();
		},
		deleteDomain: async function() {
			await fetch(`http://localhost/sections/domains/${this.domain.selected.id}`, {
				method: 'DELETE'
			});

			await this.reset();
		},
		loadBranchImage: function(e) {
			this.branch.image = e.target.files[0];

			const reader = new FileReader();

			reader.onload = e => {
				this.branch.imageData = e.target.result;
			};

			reader.readAsDataURL(this.branch.image);
		},
		createBranch: async function() {
			const formData = new FormData();
			formData.append('domainId', this.branch.domain.id);
			formData.append('name', this.branch.name);
			formData.append('image', this.branch.image);

			await fetch('http://localhost/sections/branches', { method: 'POST',	body: formData });

			await this.reset();
		},
		updateBranch: async function() {
			const formData = new FormData();
			formData.append('domainId', this.branch.domain.id);
			formData.append('name', this.branch.name);
			formData.append('image', this.branch.image);

			await fetch(`http://localhost/sections/branches/${this.branch.selected.id}`, {
				method: 'PUT',
				body: formData
			});

			this.domains = await getDomains();
			this.branches = await getBranches();
		},
		deleteBranch: async function() {
			await fetch(`http://localhost/sections/branches/${this.branch.selected.id}`, {
				method: 'DELETE'
			});

			await this.reset();
		},
		addBranch: async function() {
			const response = await fetch(`http://localhost/assets/images/${this.branchToAdd.image}`);
			const blob = await response.blob();
			const image = new File([blob], this.branchToAdd.image, blob);

			const formData = new FormData();
			formData.append('domainId', this.selectedDomain.id);
			formData.append('name', this.branchToAdd.name);
			formData.append('image', image);

			await fetch(`http://localhost/sections/branches/${this.branchToAdd.id}`, {
				method: 'PUT',
				body: formData
			});

			this.setUnselectedBranches();
			this.domains = await getDomains();
		},
		setUnselectedBranches: function() {
			this.unselectedBranches = JSON.parse(JSON.stringify(this.branches));

			for (const unselected of this.unselectedBranches) {
				for (const selected of this.selectedDomain.branches) {
					if (unselected.id == selected.id) {
						this.unselectedBranches = this.unselectedBranches.filter(b => b.id != selected.id);
						break;
					}
				}
			}
		},
		deleteCourse: async function() {
			await fetch(`http://localhost/sections/courses/${this.selectedCourse.id}`, {
				method: 'DELETE'
			});

			this.courses = await getCourses();
		}
	}
}
</script>

<style scoped>
	#manager {
		display: inline-flex;
	}
</style>