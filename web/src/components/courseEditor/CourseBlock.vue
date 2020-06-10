<template>
	<div>
		<div v-on:click="blockUpdate">
			<label>{{ element.type }}</label>
			<button v-on:click.stop="blockDelete">Supprimer</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseBlock',
	props: [
		'element',
		'index'
	],
	methods: {
		blockUpdate: function() {
			this.$parent.$emit('blockUpdate', this.element);
		},
		blockDelete: function() {
			this.$parent.$emit('blockDelete', this.index);
		}
	}
}
</script>

<style scoped>

</style>