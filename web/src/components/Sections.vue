<template>
	<div v-if="branch">
		<Domain
			class="domain"
			
			v-for="course in courses"
			v-bind:key="course.id"
			v-bind:name="course.name"
			v-bind:image="course.image" />
	</div>
	<div v-else-if="domain">
		<Domain
			class="domain"
			v-on:click.native="selectBranch(branch)"
			v-for="branch in branches"
			v-bind:key="branch.id"
			v-bind:name="branch.name"
			v-bind:image="branch.image" />
	</div>
	<div v-else>
		<Domain
			class="domain"
			v-on:click.native="selectDomain(domain)"
			v-for="domain in domains"
			v-bind:key="domain.id"
			v-bind:name="domain.name"
			v-bind:image="domain.image" />
	</div>
</template>

<script>
import Domain from '@/components/Domain.vue';

export default {
	name: 'Sections',
	components: {
		Domain
	},
	data: function() {
		return {
			domains: null,
			domain: null,
			branches: null,
			branch: null,
			courses: null
		};
	},
	created: function() {
		if (this.$route.params.domain != undefined) {
			this.domain = this.$route.params.domain;
			this.selectDomain(this.domain)
		}

		this.setDomains();
	},
	methods: {
		setDomains: function() {
			fetch('http://localhost/sections/domains').then(response => {
				response.json().then(json => {
					this.domains = json.response;
				});
			});
		},
		selectDomain: async function(domain) {
			this.domain = domain;

			this.branches = [];

			for (const branch of this.domain.branches) {
				const response = await fetch(`http://localhost/sections/branches/${branch.id}`);
				const json = await response.json();

				this.branches.push(json.response);
			}
		},
		selectBranch: async function(branch) {
			this.branch = branch;

			this.courses = [];

			for (const course of this.branch.courses) {
				const response = await fetch(`http://localhost/sections/courses/${course.id}`);
				const json = await response.json();
				
				this.courses.push(json.response);				
			}
		}
	}
}
</script>

<style scoped>
	div {
		display: inline-block;
		background-color: darkslategrey;
	}
</style>