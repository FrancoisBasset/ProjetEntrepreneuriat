<template>
	<div>
		<TextForm v-if="elementType == 'Texte' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<ImageVideoForm v-if="elementType == 'Image' && elementToUpdate != null" type="Image" :elementToUpdate="elementToUpdate" />
		<ImageVideoForm v-if="elementType == 'Vidéo' && elementToUpdate != null" type="Vidéo" :elementToUpdate="elementToUpdate" />
	</div>
</template>

<script>
import TextForm from '@/components/courseEditor/forms/TextForm.vue';
import ImageVideoForm from '@/components/courseEditor/forms/ImageVideoForm.vue';

export default {
	name: 'formZone',
	components: {
		TextForm,
		ImageVideoForm
	},
	props: [
		'elementType',
		'elementToUpdate'
	]
}
</script>

<style scoped>

</style>