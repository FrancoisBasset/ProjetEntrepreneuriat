<template>
	<div v-on:click="pageClick" :class="{ pageSelected: pageSelected == page.id }">
		<label>Page {{ page.index + 1 }}</label>
	</div>
</template>

<script>
export default {
	name: 'PageTree',
	props: [
		'page',
		'pageSelected'
	],
	methods: {
		pageClick: function() {
			this.$parent.$emit('pageClick', this.page);
			this.$parent.$parent.$emit('pageClick', this.page);
		}
	}
}
</script>

<style scoped>
	div {
		border: 1px solid;
		padding: 20px;
		margin: 3px;
	}

	.pageSelected {
		background-color: mediumseagreen;
	}
</style>