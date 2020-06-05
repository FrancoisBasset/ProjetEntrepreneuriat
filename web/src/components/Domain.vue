<template>
	<div id="domainDiv" :style="{ 'background-image': `url('http://localhost/assets/images/${image}')` }">
		<div id="labelDiv">
			<label>{{ name }}</label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DomainDiv',
	props: [
		'name',
		'image'
	]
}
</script>

<style scoped>
	#domainDiv {
		width: 200px;

		background-size: auto 200px;
		cursor: pointer;
	}

	#labelDiv {
		text-align: center;
		padding-top: 80%;
	}

	label {
		color: white;
		font-size: 30px;
		cursor: pointer;
	}
</style>