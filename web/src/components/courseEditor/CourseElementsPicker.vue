<template>
	<div id="pickers">
		<div class="picker" id="Texte" v-on:click="typeClick">Texte</div>
		<div class="picker" id="Image" v-on:click="typeClick">Image</div>
		<div class="picker" id="Vidéo" v-on:click="typeClick">Vidéo</div>
		<div class="picker" id="fiddle">Fiddle</div>
		<div class="picker" id="PDF" v-on:click="typeClick">PDF</div>
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
			switch(e.target.id) {
				case 'Texte':
					this.$emit('typeClick', {
						type: 'Texte',
						data: {
							text: ''
						}
					});
					break;
				case 'Image':
					this.$emit('typeClick', {
						type: 'Image',
						data: {
							src: null,
							width: null,
							height: null
						}
					});
					break;
				case 'Vidéo':
					this.$emit('typeClick', {
						type: 'Vidéo',
						data: {
							src: null,
							width: null,
							height: null
						}
					});
					break;
				case 'PDF':
					this.$emit('typeClick', {
						type: 'PDF',
						data: {
							file: null,
							from: null,
							to: null,
							allPagesCount: null,
							pagesRange: null
						}
					});
					break;
			}
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