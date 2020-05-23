<template>
	<div id="mask">
		<div id="modal">
			<div id="message">
				<label>{{ message }}</label>
			</div>
			<div id="closeButton">
				<button v-on:click="close">Fermer</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
	props: [
		'message'
	],
	methods: {
		close: function() {
			this.$emit('modalClose');
		}
	}
}
</script>

<style scoped>
	#mask {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}

	#modal {
		text-align: center;
		background-color: white;

		border: 5px solid gray;
		border-radius: 20px 20px 20px 20px;

		width: 20%;
		height: 20%;

		position: absolute;
		left: 40%;
		right: 40%;
		top: 40%;
		right: 40%;
	}

	#message {
		position: relative;
		top: 30%;
	}

	#closeButton {
		position: relative;
		top: 50%;
	}
</style>