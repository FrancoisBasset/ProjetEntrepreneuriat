<template>
	<div>
		<label>Chapitres</label>
		<ChapterTree class="chapterTree" v-for="chapter of chapters" :key="chapter.id" :chapter="chapter" v-on:pageClick="pageClick" :pageSelected="pageSelected" />
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
	],
	data: function() {
		return {
			pageSelected: null
		};
	},
	methods: {
		pageClick: function(e) {
			this.pageSelected = e.id;
		}
	}
}
</script>

<style scoped>
	.chapterTree {
		margin: 5px;
	}
</style>