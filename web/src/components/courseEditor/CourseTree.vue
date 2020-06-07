<template>
	<div>
		<label>Chapitres</label>
		<ChapterTree class="chapterTree" v-for="chapter of chapters" :key="chapter.id" :chapter="chapter" />
	</div>
</template>

<script>
import ChapterTree from '@/components/courseEditor/ChapterTree.vue';

export default {
	name: 'CourseTree',
	components: {
		ChapterTree
	},
	props: [
		'chapters'
	]
}
</script>

<style scoped>
	.chapterTree {
		margin: 5px;
	}
</style>