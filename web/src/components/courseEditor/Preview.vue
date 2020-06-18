<template>
	<div>
		<div v-for="element of elements" :key="`element${element.index}`">
			<p v-if="element.type == 'Texte'">{{ element.data.text }}</p>
			<div v-if="element.type == 'Image'" class="image">
				<img :src="element.data.src" :width="element.data.width" :height="element.data.height" />
			</div>
			<video controls v-if="element.type == 'Vidéo'" :width="element.data.width" :height="element.data.height">
				<source :src="element.data.src" />
			</video>
			<div v-if="element.type == 'PDF'" class="pdf">
				<pdf v-for="index of element.data.pagesRange" :key="index" :src="element.data.file" :page="index" />
			</div>
		</div>
	</div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
	name: 'Preview',
	components: {
		pdf
	},
	props: [
		'elements'
	]
}
</script>

<style scoped>
	.image {
		text-align: center;
	}

	.pdf {
		text-align: center;
	}
</style>