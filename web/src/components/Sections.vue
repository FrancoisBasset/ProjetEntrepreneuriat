<template>
	<div>
		<button v-if="returnTo != null" v-on:click="returnToParent">Retour aux {{ returnTo }}</button>
		<Section v-on:click.native="select(child)" v-for="child of children" :key="child.id" :name="child.name" :image="child.image" />
		<label v-if="course != null">{{ course }}</label>
	</div>
</template>

<script>
import { getDomains, getDomain, getBranch } from '@/utils/promises';
import Section from '@/components/Section.vue';

export default {
	name: 'Sections',
	components: {
		Section
	},
	data: function() {
		return {
			parent: null,
			children: null,
			course: null,

			returnTo: null
		};
	},
	created: async function() {
		if (this.$route.params.domain != undefined) {
			this.parent = await getDomain(this.$route.params.domain.id);
		}

		this.setChildren();
	},
	methods: {
		setChildren: async function() {
			if (this.parent == null) {
				this.children = await getDomains();
			} else {
				this.children = this.parent.branches;
				this.returnTo = 'domaines';
			}
		},
		select: async function(section) {
			if (section.branches != undefined) {
				this.parent = section;
				this.children = this.parent.branches;

				this.returnTo = 'domaines';
			} else if (section.domainId != undefined) {
				this.parent = section;
				this.parent = await getBranch(this.parent.id);
				this.children = this.parent.courses;

				this.returnTo = 'branches';
			} else if (section.branchId != undefined) {
				this.course = section;
			}
		},
		returnToParent: async function() {
			switch (this.returnTo) {
				case 'domaines':
					this.parent == null;
					this.children = await getDomains();
					this.returnTo = null;
					break;
				case 'branches':
					this.parent = await getDomain(this.parent.id);
					this.children = this.parent.branches;
					break;
			}
		}
	}
}
</script>

<style scoped>
	div {
		display: inline-block;
	}
</style>