<template>
	<div>
		<TextForm v-if="elementType == 'Texte' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<ImageVideoForm v-if="elementType == 'Image' && elementToUpdate != null" type="Image" :elementToUpdate="elementToUpdate" />
		<ImageVideoForm v-if="elementType == 'Vidéo' && elementToUpdate != null" type="Vidéo" :elementToUpdate="elementToUpdate" />
		<FiddleForm v-if="elementType == 'Fiddle' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<PDFForm v-if="elementType == 'PDF' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<DOCXForm v-if="elementType == 'DOCX' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<TableauForm v-if="elementType == 'Tableau' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
		<QCMForm v-if="elementType == 'QCM' && elementToUpdate != null" :elementToUpdate="elementToUpdate" />
	</div>
</template>

<script>
import TextForm from '@/components/courseEditor/forms/TextForm.vue';
import ImageVideoForm from '@/components/courseEditor/forms/ImageVideoForm.vue';
import FiddleForm from '@/components/courseEditor/forms/FiddleForm.vue';
import PDFForm from '@/components/courseEditor/forms/PDFForm.vue';
import DOCXForm from '@/components/courseEditor/forms/DOCXForm.vue';
import TableauForm from '@/components/courseEditor/forms/TableauForm.vue';
import QCMForm from '@/components/courseEditor/forms/QCMForm.vue';

export default {
	name: 'formZone',
	components: {
		TextForm,
		ImageVideoForm,
		FiddleForm,
		PDFForm,
		DOCXForm,
		TableauForm,
		QCMForm
	},
	props: [
		'elementType',
		'elementToUpdate'
	]
}
</script>

<style scoped>

</style>