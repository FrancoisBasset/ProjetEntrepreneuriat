<template>
	<div style="display: inline-block">
		<div>
		<label>Fichier PDF</label>
		<input type="file" accept=".pdf" v-on:change="loadPdf" />
		<label>Page de début</label>
		<input type="number" v-model="elementToUpdate.data.from" v-on:change="changePagesRange" min="1" :max="elementToUpdate.data.to" />
		<label>Page de fin</label>
		<input type="number" v-model="elementToUpdate.data.to" v-on:change="changePagesRange" :min="elementToUpdate.data.from" :max="elementToUpdate.data.allPagesCount" />
		</div>
		
		<div style="overview: scroll">
			<pdf style="display: inline-block; width: 25%; overview: scroll" v-for="index of elementToUpdate.data.pagesRange" :key="index" :src="elementToUpdate.data.file" :page="index" />
		</div>
	</div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
	name: 'PDFForm',
	components: {
		pdf
	},
	props: [
		'elementToUpdate'
	],
	created: function() {
		this.changePagesRange();
	},
	methods: {
		loadPdf: function(e) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = e => {
				this.elementToUpdate.data.file = e.target.result;

				var loadingTask = pdf.createLoadingTask(this.elementToUpdate.data.file);
				
				loadingTask.promise.then(info => {
					this.elementToUpdate.data.allPagesCount = info.numPages;
				});
			};
			
			reader.readAsDataURL(file);
		},
		changePagesRange: function() {
			this.elementToUpdate.data.pagesRange = [];			

			for (var i = parseInt(this.elementToUpdate.data.from); i <= parseInt(this.elementToUpdate.data.to); i++) {
				this.elementToUpdate.data.pagesRange.push(i);
			}
		}
	}
}
</script>