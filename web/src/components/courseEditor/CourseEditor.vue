<template>
	<div>
		<CourseTree id="courseTree" :chapters="course.chapters" v-on:pageClick="pageClick" v-on:pageRemove="pageRemove" />
		<CourseElementsPicker id="courseElementsPicker" v-on:typeClick="typeClick" />

		<div v-if="page != null" id="bottomButtons">
			<div id="editorButtonDiv">
				<button id="editorButton" v-on:click="mode = 'editor'">Editeur</button>
			</div>
			<div id="previewButtonDiv">
				<button id="previewButton" v-on:click="mode = 'preview'">Preview</button>
			</div>
		</div>
		
		<div v-if="mode == 'editor' && page != null" id="board">
			<FormZone id="formZone" :key="`formZoneKey${formZoneKey}`" :elementType="elementType" :elementToUpdate="elementToUpdate" v-on:elementSave="elementSave" v-on:elementUpdate="elementUpdate" />
			<CourseBlocks id="blocks" :key="`elementsKey${elementsKey}`" :elements="page.elements" v-on:blockUpdate="blockUpdate" v-on:blockDelete="blockDelete" v-on:blockDrop="blockDrop" />
		</div>
		<div v-if="mode == 'preview'" id="board">
			<Preview :elements="page.elements" />
		</div>
	</div>
</template>

<script>
import { getAccount, getCourse } from '@/utils/promises';
import CourseTree from '@/components/courseEditor/CourseTree.vue';
import CourseElementsPicker from '@/components/courseEditor/CourseElementsPicker.vue';
import FormZone from '@/components/courseEditor/FormZone.vue';
import CourseBlocks from '@/components/courseEditor/CourseBlocks.vue';
import Preview from '@/components/courseEditor/Preview.vue';

export default {
	name: 'CourseEditor',
	components: {
		CourseTree,
		CourseElementsPicker,
		FormZone,
		CourseBlocks,
		Preview
	},
	data: function() {
		return {
			account: {},
			course: {},

			//chapter: null,
			page: null,

			mode: 'editor',
			elementType: null,
			elementIndex: null,
			elementToUpdate: null,

			formZoneKey: 0,
			elementsKey: 0
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.course = await getCourse(this.$route.query.courseId);

		setInterval(() => {
			if (this.page != null) {
				this.savePage();
			}
		}, 1000);
	},
	methods: {
		savePage: function() {
			console.log(this.page.elements);
			

			fetch(`http://localhost/sections/pages/${this.page.id}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					index: this.page.index,
					chapterId: this.page.chapter.id,
					elements: JSON.stringify(this.page.elements)
				})
			});
		},
		pageClick: function(e) {
			this.page = e;
			this.elementToUpdate = null;

			fetch(`http://localhost/sections/pages/${e.id}`).then(response => {
				response.json().then(json => {
					this.page.elements = json.response.elements;
					console.log(this.page.elements);
				});
			});			
		},
		pageRemove: function(e) {
			//console.log(this.page.id + ' ' + e.id);
			
			if (this.page.id == e.id) {
				this.page = null;
			}
		},
		typeClick: function(e) {
			this.elementType = e;
			this.elementToUpdate = null;

			this.formZoneKey++;
		},		
		elementSave: function(e) {
			e.index = this.page.elements.length;

			console.log(e);
			
			
			this.page.elements.push(e);

			console.log(this.page);
			
			this.elementToUpdate = e;
		},
		elementUpdate: function(e) {
			this.page.elements[e.index] = e;
		},
		blockUpdate: function(e) {
			this.elementToUpdate = e;
			this.elementType = e.type;
		},
		blockDelete: function(e) {
			this.page.elements.splice(e, 1);

			if (e == this.elementToUpdate.index) {
				this.elementToUpdate = null;
			}

			for (var i = 0; i < this.page.elements.length; i++) {
				this.page.elements[i].index = i;
			}

			this.formZoneKey++;
		},
		blockDrop: function(e) {
			const from = e.from;
			const to = e.to;

			var element = this.page.elements[from];

			this.page.elements.splice(from, 1);
			this.page.elements.splice(to, 0, element);
			
			for (var i = 0; i < this.page.elements.length; i++) {
				this.page.elements[i].index = i;
			}

			this.elementsKey++;
		}
	}
}
</script>

<style scoped>
	#courseTree {
		position: fixed;
		display: inline-block;
		border: 1px solid;
		height: 95%;
		overflow: scroll;
	}

	#board {
		position: fixed;
		height: 95%;
		width: 90%;
		margin-left: 150px;
	}

	#courseElementsPicker {
		display: inline-flex;
		margin-left: 150px;
	}

	#formZone {
		border: 1px solid;
		height: 25%;
	}

	#blocks {
		border: 1px solid;
		height: 60%;
		overflow: scroll;
	}

	#bottomButtons {
		display: inline-flex;
		width: 100%;
		height: 15%;
		margin-bottom: 0px;
	}

	#editorButtonDiv, #previewButtonDiv {
		width: 50%;
		height: 100%;
	}

	#editorButton, #previewButton {
		width: 100%;
		height: 100%;
	}

	#preview {
		height: 50%;
	}
</style>