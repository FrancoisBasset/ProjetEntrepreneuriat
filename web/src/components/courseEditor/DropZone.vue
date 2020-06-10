<template>
	<div>
		<TextForm v-if="elementType == 'Texte' && elementToUpdate == null" :elementToUpdate="elementToUpdate" />
		<TextForm v-if="elementType == 'Texte' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />

		<!--<ImageVideoForm v-if="elementType == 'Image'" type="Image" :elementToUpdate="elementToUpdate" />
		<ImageVideoForm v-if="elementType == 'Vidéo'" type="Vidéo" :elementToUpdate="elementToUpdate" />-->
	</div>
</template>

<script>
import TextForm from '@/components/courseEditor/forms/TextForm.vue';
import ImageVideoForm from '@/components/courseEditor/forms/ImageVideoForm.vue';

export default {
	name: 'DropZone',
	components: {
		TextForm,
		ImageVideoForm
	},
	props: [
		'elementType',
		'elementToUpdate'
	],
	mounted: function() {
		console.log(this.elementType);
		console.log(this.elementToUpdate);	
	}
}
</script>

<style scoped>

</style>