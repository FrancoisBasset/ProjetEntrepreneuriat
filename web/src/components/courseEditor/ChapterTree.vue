<template>
	<div>
		<div id="header" v-on:click.exact="extended = !extended">
			<label v-if="extended">▼</label>
			<label v-else>►</label>
			<label v-if="!editMode">{{ chapter.name }}</label>
			<input v-on:click.stop v-else type="text" v-model="chapter.name" />
			<button v-on:click.stop="setEditMode" style="border: none; outline: none">
				<img src="../../assets/edit.png" />
			</button>
		</div>
		<div v-show="extended" v-on:dragover="allowDrop" v-on:dragstart="drag" v-on:drop="drop">
			<PageTree :id="`page${page.index}`" v-for="page of pages" :key="page.id" draggable="true" :page="page" :pageSelected="pageSelected" v-on:pageRemove="pageRemove" />
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
			pages: [],
			editMode: false
		};
	},
	created: async function() {
		await this.setPages();
	},
	methods: {
		allowDrop: function(e) {
			e.preventDefault();
		},
		drag: function(e) {
			e.dataTransfer.setData('pageId', e.target.id);
		},
		drop: async function(e) {
			var from = e.dataTransfer.getData('pageId');

			var to = e.target.parentElement.parentElement.id;
			if (!to.includes('page')) {
				to = e.target.parentElement.parentElement.parentElement.id;
			}

			if (!to.includes('page')) {
				return;
			}

			from = from.split('page')[1];
			to = to.split('page')[1];			

			const pageToMove = this.pages[from];

			this.pages.splice(from, 1);
			this.pages.splice(to, 0, pageToMove);

			for (var i = 0; i < this.pages.length; i++) {
				this.pages[i].index = i;
			}
			
			for (const page of this.pages) {
				await fetch(`http://localhost/sections/pages/${page.id}`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						index: page.index,
						chapterId: page.chapter.id,
						elements: JSON.stringify(page.elements)
					})
				});
			}
		},
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
			
		},
		setEditMode: function() {
			this.editMode = !this.editMode;

			if (!this.editMode) {
				this.saveChapter();
			}
		},
		saveChapter: function(e) {
			fetch(`http://localhost/sections/chapters/${this.chapter.id}/quickedit`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.chapter.name,
					index: this.chapter.index
				})
			});
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