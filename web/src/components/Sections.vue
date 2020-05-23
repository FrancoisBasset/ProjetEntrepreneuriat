<template>
	<div v-if="branch">
		<Domain
			class="domain"
			
			v-for="course in courses"
			v-bind:key="course.section.id"
			v-bind:name="course.section.name"
			v-bind:image="course.section.image" />
	</div>
	<div v-else-if="domain">
		<Domain
			class="domain"
			v-on:click.native="selectBranch(branch)"
			v-for="branch in branches"
			v-bind:key="branch.section.id"
			v-bind:name="branch.section.name"
			v-bind:image="branch.section.image" />
	</div>
	<div v-else>
		<Domain
			class="domain"
			v-on:click.native="selectDomain(domain)"
			v-for="domain in domains"
			v-bind:key="domain.section.id"
			v-bind:name="domain.section.name"
			v-bind:image="domain.section.image" />
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
			fetch('http://localhost/sections?type=domain').then(response => {
				response.json().then(json => {
					this.domains = json.response;
				});
			});
		},
		selectDomain: async function(domain) {
			this.domain = domain;

			this.branches = [];

			for (const branch of this.domain.branches) {
				const response = await fetch(`http://localhost/sections/${branch.sectionId}`);
				const json = await response.json();

				this.branches.push(json.response);
			}
		},
		selectBranch: async function(branch) {
			this.branch = branch;

			this.courses = [];

			for (const course of this.branch.courses) {
				const response = await fetch(`http://localhost/sections/${course.sectionId}`);
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