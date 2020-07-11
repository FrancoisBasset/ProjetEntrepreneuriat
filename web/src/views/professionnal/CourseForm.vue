<template>
	<div id="root">
		<HomeBar home="professionnalHome" />

		<Previous to="/home" />

		<div id="form">
			<form>
				<div class="formDiv">
					<div class="label">
						<label>Domaine </label>
					</div>
					<select v-model="selectedDomain" size="10">
						<option v-for="domain of domains" :key="domain.id" :value="domain" selected="this.selectedDomain">{{ domain.name }}</option>
					</select>
				</div>
				
				<div class="formDiv">
					<div class="label">
						<label>Branche </label>
					</div>

					<button v-if="createNewBranch == false" v-on:click="createNewBranch = true">Créer une nouvelle branche</button>
					<button v-else v-on:click="createNewBranch = false">Utiliser une ancienne branche</button>
					<br>

					<div v-if="!createNewBranch">
						<select v-model="newCourse.branch" size="10">
							<option v-for="branch of branches" :key="branch.id" :value="branch" selected="this.newCourse.branch">{{ branch.name }}</option>
						</select>
					</div>
					<div v-else>
						<div class="label">
							<label>Nom de la nouvelle branche </label>
						</div>
						<input type="text" v-model="newBranch.name" />
						<FormWarning :success="newBranch.nameOk" />
						
						<div class="label">
							<label>Image </label>
						</div>
						<input type="file" v-on:change="loadNewBranchImage" /><br>
						<img v-if="newBranch.image != null" :src="branchImage" width="300px" />
					</div>
				</div>

				<div class="formDiv">
					<div class="label">
						<label>Nom du cours</label>
					</div>
					<input type="text" v-model="newCourse.name" />
					<FormWarning :success="newCourse.nameOk" />
				</div>

				<div class="formDiv">
					<div class="label">
						<label>Image du cours</label>
					</div>
					
					<input type="file" v-on:change="loadNewCourseImage" /><br>
					<img v-if="newCourse.image != null || courseImage != null" :src="courseImage" width="300px" />
				</div>

				<div class="formDiv">
					<div class="label">
						<label>Difficulté</label>
					</div>

					<div>
						<label>{{ newCourse.difficulty }}</label><br>
						<input type="range" v-model="newCourse.difficulty" min="1" max="5" />
					</div>
				</div>

				<div class="formDiv">
					<div class="label">
						<label>Objectifs</label>
					</div>
					<div v-for="i of newCourse.objectives.length" :key="i - 1">
						<label style="color: white">Objectif n°{{ i }} </label>
						<input type="text" v-model="newCourse.objectives[i - 1]" />
						<button v-if="newCourse.objectives.length > 1" v-on:click="newCourse.objectives.splice(i - 1, 1)">-</button>
						<button v-if="newCourse.objectives.length == i" v-on:click="newCourse.objectives.push('')">+</button>
					</div>
				</div>

				<div class="formDiv">
					<div class="label">
						<Label>Payant</Label>
					</div>
					<input type="checkbox" v-model="newCourse.paying" />
				</div>

				<div v-if="updateMode">
					<button v-on:click="createOrUpdateCourse">Modifier le cours</button><br>
					<router-link :to="{ path: '/courseEditor', query: { courseId: courseId } }">
						<button>Editer le contenu du cours</button>
					</router-link><br>
					<button v-on:click="deleteCourse">Supprimer le cours</button>
				</div>
				<div v-else>
					<button v-on:click="createOrUpdateCourse">Créer le cours</button>
				</div>
			</form>
		</div>

		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false">
			<div v-if="modalReason == 'missings'" slot="content" id="content">
				<label>Il manque:</label>
				<div v-for="missing of missings" :key="missing">
					<label>- {{ missing }}</label>
				</div>
			</div>
			<div v-if="modalReason == 'error'" slot="content" id="content">
				<label>{{ this.message }}</label>
			</div>
			<div v-if="modalReason == 'created'" slot="content" id="content">
				<label>Le cours a bien été crée</label>
			</div>
			<div v-if="modalReason == 'updated'" slot="content" id="content">
				<label>Le cours a bien été modifié</label>
			</div>

			<div v-if="modalReason == 'created'" slot="controls" id="controls">
				<router-link to="/home">
					<button>Fermer</button>
				</router-link>
			</div>
			<div v-else slot="controls" id="controls">
				<button v-on:click="modalVisible = false">Fermer</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { getAccount, getDomains } from '@/utils/promises'
import HomeBar from '@/components/utils/HomeBar.vue';
import Modal from '@/components/utils/Modal.vue';
import FormWarning from '@/components/utils/FormWarning.vue';
import Previous from '@/components/utils/Previous.vue';

export default {
	name: 'CourseForm',
	components: {
		HomeBar,
		Modal,
		FormWarning,
		Previous
	},
	data: function() {
		return {
			account: {},
			domains: {},

			branches: null,
			selectedDomain: null,
			createNewBranch: false,

			branchImage: null,
			courseImage: null,

			newBranch: {
				name: '',
				image: null,

				nameOk: false
			},
			
			newCourse: {
				name: '',
				image: null,
				branch: null,
				difficulty: 1,
				objectives: [''],
				paying: false,

				nameOk: false
			},

			oldCourse: {},
			
			modalVisible: false,
			modalReason: null,
			message: null,
			missings: [],

			updateMode: false,
			courseId: null
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.domains = await getDomains();

		if (this.$route.query.courseId != undefined) {
			this.updateMode = true;
			this.courseId = this.$route.query.courseId;

			fetch(`http://localhost/sections/courses/${this.courseId}`).then(response => {
				if (response.status == 404) {
					this.modalVisible = true;
					this.modalReason = 'error';
					this.message = `Le cours n°${this.courseId} n'existe pas`;
				} else {
					response.json().then(json => {
						this.oldCourse = json.response;

						for (const domain of this.domains) {
							if (domain.id == this.oldCourse.branch.domainId) {
								this.selectedDomain = domain;
							}
						}						

						this.branches = this.selectedDomain.branches;
						this.newCourse.branch = this.oldCourse.branch;
						this.newCourse.name = this.oldCourse.name;
						this.courseImage = `http://localhost/assets/images/${this.oldCourse.image}`;
						
						fetch(`http://localhost/assets/images/${this.oldCourse.image}`).then(r => {
							r.blob().then(blob => {
								this.newCourse.image = new File([blob], this.oldCourse.image, blob);
							});
						})
						

						this.newCourse.difficulty = this.oldCourse.difficulty;
						this.newCourse.objectives = this.oldCourse.objectives.split(';');
						this.newCourse.paying = this.oldCourse.paying;
					});
				}
			});
		}
		
	},
	watch: {
		selectedDomain: function() {
			this.branches = this.selectedDomain.branches;
		},
		'newBranch.name': function() {
			this.checkNewBranchName();
		},
		'newCourse.name': function() {
			this.checkNewCourseName();
		}
	},
	methods: {
		loadNewBranchImage: function(e) {
			this.newBranch.image = e.target.files[0];
			
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = e => {
				this.branchImage = e.target.result;
			}

			reader.readAsDataURL(file);
		},
		loadNewCourseImage: function(e) {
			this.newCourse.image = e.target.files[0];
			
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = e => {
				this.courseImage = e.target.result;
			}

			reader.readAsDataURL(file);
		},
		checkNewBranchName: function() {
			this.newBranch.nameOk = true;

			if (this.newBranch.name.trim() == '') {
				this.newBranch.nameOk = false;
				return;
			}
			
			for (const domain of this.domains) {
				for (const branch of domain.branches) {
					if (branch.name == this.newBranch.name) {
						this.newBranch.nameOk = false;
						return;
					}
				}
			}
		},
		checkNewCourseName: async function() {
			this.newCourse.nameOk = true;

			if (this.newCourse.name.trim() == '') {
				this.newCourse.nameOk = false;
				return;
			}

			if (this.newCourse.name == this.oldCourse.name) {
				this.newCourse.nameOk = true;
				return;
			}

			const response = await fetch(`http://localhost/sections/courses?search=${this.newCourse.name}`);
			const json = await response.json();
			
			for (const course of json.response) {
				if (this.newCourse.name == course.name) {
					this.newCourse.nameOk = false;
					return;
				}				
			}
		},
		checkAll: async function() {
			var missings = [];
			if (this.createNewBranch) {
				this.checkNewBranchName();
				if (!this.newBranch.nameOk) missings.push('Le nom de la nouvelle branche');
				if (this.newBranch.image == null) missings.push('L\'image de la nouvelle branche');
			} else {
				if (this.newCourse.branch == null) missings.push('Le nom de la branche');
			}

			await this.checkNewCourseName();
			
			if (!this.newCourse.nameOk) missings.push('Le nom du cours');
			if (this.newCourse.image == null) missings.push('L\'image du cours');

			return missings;
		},
		createOrUpdateCourse: async function() {
			this.missings = await this.checkAll();
			
			if (this.missings.length > 0) {
				this.modalVisible = true;
				this.modalReason = 'missings';
				return;
			}

			var branchId;

			if (this.createNewBranch) {
				var formData = new FormData();
				formData.append('name', this.newBranch.name);
				formData.append('image', this.newBranch.image);
				formData.append('domainId', this.selectedDomain.id);

				var response = await fetch('http://localhost/sections/branches', { method: 'POST', body: formData });
				var json = await response.json();
				
				branchId = json.response.id;
			} else {
				branchId = this.newCourse.branch.id;
			}

			var objectives = '';
			for (const objective of this.newCourse.objectives) {
				if (objective.trim() != '') {
					objectives += objective + ';';
				}
			}

			formData = new FormData();
			formData.append('name', this.newCourse.name);
			formData.append('image', this.newCourse.image);
			formData.append('branchId', branchId);
			formData.append('authorId', this.account.id);
			formData.append('difficulty', this.newCourse.difficulty);
			formData.append('objectives', objectives);
			formData.append('paying', this.newCourse.paying);
			
			var response = null;
			if (this.updateMode) {
				response = await fetch(`http://localhost/sections/courses/${this.oldCourse.id}`, { method: 'PUT', body: formData });
				this.modalReason = 'updated';
			} else {
				response = await fetch('http://localhost/sections/courses', { method: 'POST', body: formData });
				this.modalReason = 'created';
			}

			json = await response.json();			

			this.modalVisible = true;

			if (!json.success) {
				this.message = json.response;
			}
		},
		deleteCourse: function() {
			fetch(`http://localhost/sections/courses/${this.oldCourse.id}`, {
				method: 'DELETE'
			}).then(response => {
				response.json().then(json => {
					if (!json.success) {
						this.modalVisible = true;
						this.message = json.response;
					} else {
						this.$router.push({
							path: '/home'
						});
					}
				});
			});
		}
	}
}
</script>

<style scoped>
	#root {
		margin: auto;
		width: 40%;
	}

	#form {
		text-align: center;
	}

	.formDiv {
		padding-top: 20px;
		padding-bottom: 20px;

		
		margin: 30px;
		
		background-color: mediumseagreen;

		border-radius: 10px;
	}

	.label {
		text-align: left;
		color: white;
		font-size: 20px;
	}

	select {
		width: 50%;
	}

	input[type=checkbox] {
		transform: scale(2)
	}

	input[type=range] {
		transform: scale(1.5);
	}
</style>