<template>
	<div :class="{ selected: selected }">
		<div v-on:click="blockUpdate">
			<label v-if="element.type == 'Texte'">{{ element.data.text }}</label>
			<img v-if="element.type == 'Image'" :src="element.data.src" height="30px" />
			<video autoplay muted v-if="element.type == 'Vidéo' && element.data.src != null" height="30px">
				<source :src="element.data.src" />
			</video>
			<label v-if="element.type == 'Fiddle'">Fiddle {{ element.data.language }}</label>
			<label v-if="element.type == 'PDF'">PDF : {{ element.data.filename }}</label>
			<label v-if="element.type == 'DOCX'">DOCX : {{ element.data.filename }}</label>
			<label v-if="element.type == 'Tableau'">Tableau</label>
			<label v-if="element.type == 'QCM'">QCM: {{ element.data.question }}</label>
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