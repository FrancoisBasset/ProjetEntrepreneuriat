<template>
	<div>
		<div v-for="element of elements" :key="`element${element.index}`">
			<p v-if="element.type == 'Texte'">{{ element.data.text }}</p>
			<img v-if="element.type == 'Image'" :src="element.data.src" :width="element.data.width" :height="element.data.height" />
			<video controls v-if="element.type == 'Vidéo'" :width="element.data.width" :height="element.data.height">
				<source :src="element.data.src" />
			</video>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Preview',
	props: [
		'elements'
	]
}
</script>

<style scoped>
	#preview {
		overflow: scroll;
	}
</style>