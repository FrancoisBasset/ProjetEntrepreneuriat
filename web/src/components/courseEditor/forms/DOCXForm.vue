<template>
	<div>
		Fichier .docx
		<input type="file" v-on:change="load" />

		<DOCX v-if="elementToUpdate.data.base64 != null" :base64="elementToUpdate.data.base64" />
	</div>
</template>

<script>
import DOCX from '@/components/courseEditor/DOCX.vue';

export default {
	name: 'DOCXForm',
	components: {
		DOCX
	},
	props: [
		'elementToUpdate'
	],
	methods: {
		load: function(e) {
			const file = e.target.files[0];
			this.elementToUpdate.data.filename = file.name;

			const reader = new FileReader();

			reader.onload = e => {
				this.elementToUpdate.data.base64 = e.target.result;
			};

			reader.readAsDataURL(file);
		}
	}
}
</script>