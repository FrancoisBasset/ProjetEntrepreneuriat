<template>
	<router-link :to="{ name: to }">
		<button>Retour</button>
	</router-link>
</template>

<script>
export default {
	name: 'Previous',
	props: [
		'to'
	]
}
</script>

<style scoped>
	button {
		background-color: mediumseagreen;
		border: none;
		color: white;
		padding: 20px;
		width: 100px;
		border-radius: 10px;
		cursor: pointer;
		outline: none;
	}
</style>