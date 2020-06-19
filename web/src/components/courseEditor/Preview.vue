<template>
	<div>
		<div v-for="element of elements" :key="`element${element.index}`">
			<p v-if="element.type == 'Texte'">{{ element.data.text }}</p>
			<div v-if="element.type == 'Image'" class="image">
				<img :src="element.data.src" :width="element.data.width" :height="element.data.height" />
			</div>
			<div v-if="element.type == 'Vidéo'" class="video">
				<video controls :width="element.data.width" :height="element.data.height">
					<source :src="element.data.src" />
				</video>
			</div>
			<div v-if="element.type == 'PDF'" class="pdf">
				<pdf v-for="index of element.data.pagesRange" :key="index" :src="element.data.file" :page="index" />
			</div>
			<div v-if="element.type == 'Fiddle'">
				<Fiddle :language="element.data.language" :code="element.data.code" />
			</div>
		</div>
	</div>
</template>

<script>
import pdf from 'vue-pdf';
import Fiddle from '@/components/courseEditor/Fiddle.vue';

export default {
	name: 'Preview',
	components: {
		pdf,
		Fiddle
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

	.video {
		text-align: center;
	}

	.pdf {
		text-align: center;
	}
</style>