<template>
	<div>
		<label>Texte :</label>
		<br>
		<textarea v-model="elementToUpdate.data.text"></textarea>
	</div>
</template>

<script>
export default {
	name: 'TextForm',
	props: {
		'elementToUpdate': {
			default: {}
		}
	}
}
</script>

<style scoped>
	div {
		text-align: center;
	}

	textarea {
		width: 80%;
		height: 150px;
	}
</style>