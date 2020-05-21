<template>
	<div id="domainDiv" v-bind:style="{ 'background-image': `url('http://localhost/assets/images/${image}')` }">
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
		margin-left: 30px;

		background-size: auto 200px;
	}

	#labelDiv {
		text-align: center;
		padding-top: 80%;
	}

	label {
		color: white;
		font-size: 30px;
	}
</style>