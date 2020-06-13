<template>
	<div>
		<div id="header" v-on:click="extended = !extended">
			<label v-if="extended">▼</label>
			<label v-else>►</label>
			<label>{{ chapter.name }}</label>
		</div>
		<div v-show="extended">
			<PageTree v-for="page of pages" :key="page.id" :page="page" :pageSelected="pageSelected" v-on:pageRemove="pageRemove" />
			<button id="createPageButton" v-on:click="createPage">+</button>
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
		'chapter',
		'pageSelected'
	],
	data: function() {
		return {
			extended: false,
			pages: []
		};
	},
	created: async function() {
		await this.setPages();
	},
	methods: {
		setPages: async function() {
			var response = await fetch(`http://localhost/sections/chapters/${this.chapter.id}`);
			var json = await response.json();
			const chaptersPages = json.response.pages;

			this.pages = [];

			for (const page of chaptersPages) {
				response = await fetch(`http://localhost/sections/pages/${page.id}`);
				json = await response.json();
				
				this.pages.push(json.response);
			}
		},
		createPage: function() {
			const index = this.pages.length;
			const chapterId = this.chapter.id;

			console.log(index + '_' + chapterId);
			
			fetch('http://localhost/sections/pages', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					index: index,
					chapterId: chapterId
				})
			}).then(response => {
				response.json().then(json => {
					this.pages.push(json.response);					
				});
			});
		},
		pageRemove: async function(e) {
			var response = await fetch(`http://localhost/sections/chapters/${this.chapter.id}`);
			var json = await response.json();
			const chaptersPages = json.response.pages;

			this.pages = [];

			for (const page of chaptersPages) {
				response = await fetch(`http://localhost/sections/pages/${page.id}`);
				json = await response.json();
				
				this.pages.push(json.response);

				console.log(json.response.index);
				
			}

			//console.log(this.pages);
			
		}
	}
}
</script>

<style scoped>
	#header {
		cursor: pointer;
	}

	#createPageButton {
		margin: 3px;
		padding-left: 40px;
		padding-right: 40px;
	}
</style>