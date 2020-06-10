<template>
	<div id="pickers">
		<div class="picker" id="Texte" v-on:click="typeClick">Texte</div>
		<div class="picker" id="Image" v-on:click="typeClick">Image</div>
		<div class="picker" id="Vidéo" v-on:click="typeClick">Vidéo</div>
		<div class="picker" id="fiddle">Fiddle</div>
		<div class="picker" id="pdf">PDF</div>
		<div class="picker" id="docx">DOCX</div>
		<div class="picker" id="odt">ODT</div>
		<div class="picker" id="table">Tableau</div>
		<div class="picker" id="audio">Audio</div>
		<div class="picker" id="exercice">Exercices</div>
	</div>
</template>

<script>
export default {
	name: 'CourseElementsPicker',
	methods: {
		typeClick: function(e) {
			this.$emit('typeClick', e.target.id);
		}
	}
}
</script>

<style scoped>
	#pickers {
		display: inline-flex;
	}

	.picker {
		padding: 10px;
		border: 1px solid;

		cursor: pointer;
	}
</style>