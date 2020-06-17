<template>
	<div :class="{ selected: selected }">
		<div v-on:click="blockUpdate">
			<label v-if="element.type == 'Texte'">{{ element.data.text }}</label>
			<img v-if="element.type == 'Image'" :src="element.data.src" height="30px" />
			<video autoplay muted v-if="element.type == 'Vidéo' && element.data.src != null" height="30px">
				<source :src="element.data.src" />
			</video>
			<button v-on:click.stop="blockDelete">Supprimer</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseBlock',
	props: [
		'selected',
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
	div {
		background: lightsalmon;
		padding: 5px;
		margin: 5px;
		border-radius: 5px;
	}

	label {
		color: white;
		font-size: 25px;
	}

	button {
		border: none;
		background-color: tomato;
		color: white;
		padding: 10px;
		border-radius: 5px;
	}

	.selected {
		border: 8px solid limegreen;
	}
</style>