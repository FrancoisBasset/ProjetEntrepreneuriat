<template>
	<div>
		<div id="header" v-on:click="extended = !extended">
			<label v-if="extended">▼</label>
			<label v-else>►</label>
			<label>{{ chapter.name }}</label>
		</div>
		<div v-show="extended">
			<PageTree v-for="page of pages" :key="page.id" :page="page" />
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
			pages: null
		};
	},
	created: function() {
		fetch(`http://localhost/sections/chapters/${this.chapter.id}`).then(response => {
			response.json().then(json => {
				this.pages = json.response.pages;
			});
		});
	}
}
</script>

<style scoped>
	#header {
		cursor: pointer;
	}
</style>