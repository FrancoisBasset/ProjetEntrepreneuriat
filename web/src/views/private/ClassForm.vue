<template>
	<div>
		<HomeBar home="professionnalHome" />

		<div>
			<h1 v-if="oldClasse == null">Création de la classe virtuelle</h1>
			<h1 v-else>Modification de la classe virtuelle</h1>

			<div>
				Nom : <br><input type="text" v-model="classe.name" />
			</div>

			<div>
				Description : <br><textarea v-model="classe.description"></textarea>
			</div>

			<div>
				Classe privée : <br><input type="checkbox" :checked="classe.private" v-model="classe.private" />
			</div>

			<div>
				Prix : <br><input type="number" v-model="classe.price" />
			</div>

			<div>
				Fonctionnalités : <br>
				<select v-model="classe.fonctionnalities" multiple>
					<option></option>
					<option v-for="fonctionnality of fonctionnalities" :key="fonctionnality">{{ fonctionnality }}</option>
				</select>
			</div>

			<div>
				<button v-if="oldClasse == null" v-on:click="createVirtualClass">Créer la classe virtuelle</button>
				<div v-else>
					<button v-on:click="updateVirtualClass">Modifier la classe virtuelle</button>
					<button v-on:click="willPlan = true">Planifier</button>
				</div>
			</div>

			<div v-if="willPlan || classe.date != null">
				<h2>Planification de la classe virtuelle</h2>

				Date : <input type="date" v-model="classe.date" /><br>
				Heure de début : <input type="time" v-model="classe.beginHour" /><br>
				Heure de fin : <input type="time" v-model="classe.endHour" /><br>
				
				<button v-if="oldClasse.date == null" v-on:click="plan">Planifier</button>
				<div v-else>
					<button v-on:click="plan">Replanifier</button>
					<button v-on:click="cancelPlan">Annuler la planification</button>
				</div>
				<br><label style="color: red">{{ planError }}</label>

			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'ClassForm',
	components: {
		HomeBar
	},
	data: function() {
		return {
			fonctionnalities: ['chat', 'camera'],
			classe: {
				id: null,
				name: '',
				description: '',
				private: false,
				price: 0,
				fonctionnalities: [''],
				
				date: null,
				beginHour: null,
				endHour: null
			},

			oldClasse: null,

			willPlan: false,
			planError: ''
		};
	},
	created: async function() {
		if (this.$route.query.classId != undefined) {
			const response = await fetch(`http://localhost/classes/${this.$route.query.classId}`);
			const json = await response.json();
			
			this.oldClasse = json.response;

			this.classe.id = this.oldClasse.id;
			this.classe.name = this.oldClasse.name;
			this.classe.description = this.oldClasse.description;
			this.classe.private = this.oldClasse.private;
			this.classe.price = this.oldClasse.price;
			this.classe.fonctionnalities = this.oldClasse.fonctionnalities.split(';');
			this.classe.date = this.oldClasse.date;
			this.classe.beginHour = this.oldClasse.beginHour;
			this.classe.endHour = this.oldClasse.endHour;
		}
	},
	methods: {
		createVirtualClass: async function() {
			var fonctionnalities = '';
			for (const fonctionnality of this.classe.fonctionnalities) {
				if (fonctionnality.trim() != '') {
					fonctionnalities += fonctionnality + ';';
				}
			}

			const response = await fetch('http://localhost/classes', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.classe.name,
					description: this.classe.description,
					private: this.classe.private,
					price: this.classe.price,
					fonctionnalities: fonctionnalities
				})
			});
			const json = await response.json();
			this.oldClasse = json.response;

			this.classe.id = this.oldClasse.id;
		},
		updateVirtualClass: async function() {
			var fonctionnalities = '';
			for (const fonctionnality of this.classe.fonctionnalities) {
				if (fonctionnality.trim() != '') {
					fonctionnalities += fonctionnality + ';';
				}
			}

			const response = await fetch(`http://localhost/classes/${this.classe.id}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.classe.name,
					description: this.classe.description,
					private: this.classe.private,
					price: this.classe.price,
					fonctionnalities: fonctionnalities
				})
			});
			const json = await response.json();
			this.oldClasse = json.response;

			this.classe.id = this.oldClasse.id;
		},
		plan: async function() {
			if (this.classe.date == null || this.classe.beginHour == null || this.classe.endHour == null) {
				this.planError = 'Toutes les infos en sont pas renseignées !';
				return;
			}

			const response = await fetch(`http://localhost/classes/${this.classe.id}/plan`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					date: this.classe.date,
					beginHour: this.classe.beginHour,
					endHour: this.classe.endHour
				})
			});
			const json = await response.json();
			this.oldClasse = json.response;

			this.planError = '';
		},
		cancelPlan: async function() {
			const response = await fetch(`http://localhost/classes/${this.classe.id}/plan`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					date: null,
					beginHour: null,
					endHour: null
				})
			});
			const json = await response.json();
			this.oldClasse = json.response;

			this.classe.date = null;
			this.classe.beginHour = null;
			this.classe.endHour = null;

			this.planError = '';
		}
	}
}
</script>

<style scoped>

</style>