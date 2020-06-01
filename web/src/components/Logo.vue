<template>
	<div>
		<img src='../assets/logo.png' height="30"/>
		<label id="logoText">cole confinée</label>
	</div>
</template>

<script>
export default {
	name: 'Logo'
}
</script>

<style scoped>
	#logoText {
		color: black;
		font-size: 40px;
		font-family: "Gruenewald";
		cursor: pointer;
	}

	@font-face {
		font-family: 'Gruenewald';
		src: url('../fonts/Gruenewald.ttf');
	}
</style>