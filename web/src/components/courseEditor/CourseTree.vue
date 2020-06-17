<template>
	<div >
		<label>Chapitres</label>
		<button id="plusButton" v-on:click="modalVisible = true">+</button>

		<div v-on:dragover="allowDrop" v-on:dragstart="drag" v-on:drop="drop">
			<ChapterTree class="chapterTree" v-for="chapter of course.chapters" :key="chapter.id"
				:chapter="chapter" v-on:pageClick="pageClick" :pageSelected="pageSelected"
				:id="chapter.index" draggable="true" />
		</div>

		<Modal v-show="modalVisible" v-on:modalClose="modalVisible = false">
			<div slot="content" id="content">
				<label>Nom du chapitre</label><br>
				<input type="text" v-model="newChapterName" /><br><br>
				<button v-on:click="createChapter">Créer le chapitre</button><br><br>
				<button v-on:click="modalVisible = false">Annuler</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import ChapterTree from '@/components/courseEditor/ChapterTree.vue';
import Modal from '@/components/utils/Modal.vue';

export default {
	name: 'CourseTree',
	components: {
		ChapterTree,
		Modal
	},
	props: [
		'course',
		'chapters'
	],
	data: function() {
		return {
			pageSelected: null,
			modalVisible: false,

			newChapterName: '',
			chapterImage: null
		};
	},
	methods: {
		pageClick: function(e) {
			this.pageSelected = e.id;
		},
		createChapter: async function() {
			const response = await fetch('http://localhost/sections/chapters', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.newChapterName,
					index: this.chapters.length,
					courseId: this.course.id
				})
			});
			const json = await response.json();
			
			this.modalVisible = false;
			this.newChapterName = '';
			this.chapters.push(json.response);
		},
		allowDrop: function(e) {
			e.preventDefault();
		},
		drag: function(e) {
			e.dataTransfer.setData('from', e.target.id);
		},
		drop: async function(e) {
			const from = e.dataTransfer.getData('from');
			const to = e.target.parentElement.parentElement.id;
			
			const chapterToMove = this.chapters[from];

			this.chapters.splice(from, 1);
			this.chapters.splice(to, 0, chapterToMove);

			for (var i = 0; i < this.chapters.length; i++) {
				this.chapters[i].index = i;
			}

			for (const chapter of this.chapters) {
				await fetch(`http://localhost/sections/chapters/${chapter.id}/quickedit`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: chapter.name,
						index: chapter.index
					})
				});
			}
		}
	}
}
</script>

<style scoped>
	.chapterTree {
		margin: 5px;
	}

	#plusButton {
		color: white;
		background-color: mediumseagreen;
		border: none;
	}
</style>