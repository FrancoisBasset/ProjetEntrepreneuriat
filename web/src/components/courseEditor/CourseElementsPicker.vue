<template>
	<div id="pickers">
		<div class="picker" id="Texte" draggable="true" v-on:dragstart="drag">
			<label>Texte</label>
		</div>

		<div class="picker" id="Image" draggable="true" v-on:dragstart="drag">
			<label>Image</label>
		</div>

		<div class="picker" id="Vidéo" draggable="true" v-on:dragstart="drag">
			<label>Vidéo</label>
		</div>

		<div class="picker" id="fiddle" draggable="true" v-on:dragstart="drag">
			<label>Fiddle</label>
		</div>

		<div class="picker" id="pdf" draggable="true" v-on:dragstart="drag">
			<label>PDF</label>
		</div>

		<div class="picker" id="docx" draggable="true" v-on:dragstart="drag">
			<label>DOCX</label>
		</div>

		<div class="picker" id="odt" draggable="true" v-on:dragstart="drag">
			<label>ODT</label>
		</div>

		<div class="picker" id="table" draggable="true" v-on:dragstart="drag">
			<label>Tableau</label>
		</div>

		<div class="picker" id="audio" draggable="true" v-on:dragstart="drag">
			<label>Audio</label>
		</div>

		<div class="picker" id="exercice" draggable="true" v-on:dragstart="drag">
			<label>Exercices</label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseElementsPicker',
	methods: {
		drag: function(e) {
			e.dataTransfer.setData('elementType', e.target.id);
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
	}
</style>