<template>
	<div v-on:click="pageClick">
		<label>Page {{ index + 1 }}</label>
	</div>
</template>

<script>
export default {
	name: 'PageTree',
	props: [
		'id',
		'index'
	],
	methods: {
		pageClick: function() {
			this.$emit('pageClick', { id: this.id });
		}
	}
}
</script>

<style scoped>
	div {
		border: 1px solid;
	}
</style>