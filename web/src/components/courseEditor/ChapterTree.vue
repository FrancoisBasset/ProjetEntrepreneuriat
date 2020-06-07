<template>
	<div id="chapterTree">
		<div id="header" v-on:click="extended = !extended">
			<label v-if="extended">▼</label>
			<label v-else>►</label>
			<label>{{ chapter.name }}</label>
		</div>
		<div v-show="extended">
			<PageTree v-for="page of pages" :key="page" :id="page" :index="page - 1" />
			
			
			<!--<PageTree id="2" index="1" />
			<PageTree id="3" index="2" />
			<PageTree id="4" index="3" />
			<PageTree id="5" index="4" />-->
		</div>
	</div>
</template>

<script>
import PageTree from '@/components/courseEditor/PageTree.vue';

export default {
	name: 'ChapterTree',
	components: {
		PageTree
	},
	props: [
		'chapter'
	],
	data: function() {
		return {
			extended: false,
			pages: [1, 2, 3, 4, 5]
		};
	}
}
</script>

<style scoped>
	#header {
		cursor: pointer;
	}

	#chapterTree {
		width: auto;
	}
</style>