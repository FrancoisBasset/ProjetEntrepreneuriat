<template>
	<div>
		<div v-on:click="blockUpdate">
			<label>{{ element.type }}</label>
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
		}
	}
}
</script>

<style scoped>

</style>