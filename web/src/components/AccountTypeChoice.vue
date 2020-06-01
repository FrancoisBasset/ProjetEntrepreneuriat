<template>
	<div class="radioType" :class="{ 'selected': selected }" >
		<label>{{ title }}</label>
		<p>{{ description }}</p>
	</div>
</template>

<script>
export default {
	name: 'AccountTypeChoice',
	props: [
		'title',
		'description',
		'selected'
	]
}
</script>

<style scoped>
	* {
		cursor: pointer;
	}
	
	.radioType {
		width: 200px;

		border-radius: 20px 20px 20px 20px;
		background-color: grey;
		color: white;
	}

	.selected {
		background-color: mediumseagreen;
	}
</style>