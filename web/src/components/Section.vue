<template>
	<div id="div">
		<div id="label">
			<label>{{ name }}</label>
		</div>
		<div id="image">
			<img :src="`http://localhost/assets/images/${image}`" width="200" height="200" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Section',
	props: [
		'name',
		'image'
	]
}
</script>

<style scoped>
	#div {
		display: inline-flex;
		cursor: pointer;
		margin: 5px;
		border: 1px black solid;
	}

	#image {
		width: 200px;

		background-size: auto 200px;
	}

	#label {
		display: flex;
		align-items: center;

		width: 200px;
		height: 200px;
		background-color: white;
	}

	label {
		font-size: 30px;
		
		margin-left: auto;
		margin-right: auto;

		cursor: pointer;
	}
</style>