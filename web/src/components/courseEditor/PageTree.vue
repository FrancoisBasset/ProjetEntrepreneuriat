<template>
	<div v-on:click="pageClick">
		<label>Page {{ page.index + 1 }}</label>
	</div>
</template>

<script>
export default {
	name: 'PageTree',
	props: [
		'page'
	],
	methods: {
		pageClick: function() {
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
</style>