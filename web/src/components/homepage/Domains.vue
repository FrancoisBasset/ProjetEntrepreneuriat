<template>
	<div class="div">
		<label class="title">Domaines de cours disponibles</label>
		
		<div v-if="count > 0">
			<div id="domainsDiv">
				<Domain v-for="domain in domains" v-bind:key="domain.section.id" v-bind:name="domain.section.name" v-bind:image="domain.section.image" />
			</div>

			<div>
				<router-link id="seeAllDomainsLink" to="/formations">Voir tous les domaines</router-link>
			</div>
		</div>
		<div v-else>
			<h1>Il n'y a pas encore de domaines disponibles</h1>
		</div>
	</div>
</template>

<script>
import Domain from '@/components/homepage/Domain.vue';

export default {
	name: 'Domains',
	data: function() {
		return {
			domains: null,
			count: null
		}
	},
	components: {
		Domain
	},
	created: function() {
		this.setDomains();
	},
	methods: {
		setDomains: function() {
			fetch('http://localhost/sections?type=domain').then(response => {
				response.json().then(json => {
					this.domains = json.response;
					this.domains = this.domains.splice(0, 8);
					this.count = this.domains.length;
				});
			});
		}
	}
}
</script>

<style scoped>
	#domainsDiv {
		display: inline-flex;
	}

	#seeAllDomainsLink {
		color: black;
		text-decoration: none;
		font-size: 30px;
		font-weight: bold;
	}
</style>