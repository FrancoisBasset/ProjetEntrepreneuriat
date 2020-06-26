<template>
	<div class="div">
		<label class="title">Domaines de cours disponibles</label>
		
		<div v-if="count > 0">
			<div id="domainsDiv">
				<Section
					v-on:click.native="showDomain(domain)"
					v-for="domain in domains"
					:key="domain.id"
					:name="domain.name"
					:image="domain.image" />
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
import Section from '@/components/Section.vue';

export default {
	name: 'Domains',
	data: function() {
		return {
			domains: null,
			count: null
		}
	},
	components: {
		Section
	},
	created: function() {
		this.setDomains();
	},
	methods: {
		setDomains: function() {
			fetch('http://localhost/sections/domains').then(response => {
				response.json().then(json => {
					this.domains = json.response;
					this.domains = this.domains.splice(0, 8);
					this.count = this.domains.length;
				});
			});
		},
		showDomain: function(domain) {
			this.$router.push({
				name: 'formations',
				params: {
					domain
				},
				props: true
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