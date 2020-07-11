<template>
	<div>
		<HomeBar />

		<div>
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
				<button v-else v-on:click="updateVirtualClass">Modifier la classe virtuelle</button>
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
				fonctionnalities: ['']
			},

			oldClasse: null
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

			const response = await fetch('http://localhost/classes', {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.classe.id,
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
		}
	}
}
</script>

<style scoped>

</style>