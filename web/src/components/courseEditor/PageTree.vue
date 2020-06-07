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
			console.log(this.page.id);
			
			this.$emit('pageClick', { id: this.page.id });
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