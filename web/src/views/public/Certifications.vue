<template>
	<div>
		<MenuBar />

		<input type="text" v-model="search" />
		<button v-on:click="searchCertification">Rechercher</button>

		<br><br>

		<Certification v-for="certification in certifications" v-bind:key="certification.id" v-bind:certification="certification" />
	</div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import Certification from '@/components/Certification.vue';

export default {
	name: 'Certifications',
	components: {
		MenuBar,
		Certification
	},
	data: function() {
		return {
			certifications: null,
			search: null
		}
	},
	created: function() {
		fetch('http://localhost/certifications').then(response => {
			response.json().then(json => {
				this.certifications = json.response;
			});
		});
	},
	methods: {
		searchCertification: function() {
			fetch(`http://localhost/certifications?search=${this.search}`).then(response => {
				response.json().then(json => {
					this.certifications = json.response;
				});
			});
		}
	}
}
</script>