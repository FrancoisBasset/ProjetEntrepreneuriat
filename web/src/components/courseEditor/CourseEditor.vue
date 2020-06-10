<template>
	<div>
		<CourseTree id="courseTree" :chapters="course.chapters" />
		<CourseElementsPicker id="courseElementsPicker" />

		<div id="bottomButtons">
			<div id="editorButtonDiv">
				<button id="editorButton" v-on:click="mode = 'editor'">Editeur</button>
			</div>
			<div id="previewButtonDiv">
				<button id="previewButton" v-on:click="mode = 'preview'">Preview</button>
			</div>
		</div>
		
		<div v-if="mode == 'editor'" id="board" v-on:drop="drop" v-on:dragover="allowDrop">
			<DropZone id="dropZone" :elementType="elementType" :elementToUpdate="elementToUpdate" v-on:elementSave="elementSave" v-on:elementUpdate="elementUpdate" />
			<CourseBlocks id="blocks" :elements="elements" v-on:blockUpdate="blockUpdate" />
		</div>
		<div v-if="mode == 'preview'" id="board">
			<Preview :elements="elements" />
		</div>
	</div>
</template>

<script>
import { getAccount, getCourse } from '@/utils/promises';
import CourseTree from '@/components/courseEditor/CourseTree.vue';
import CourseElementsPicker from '@/components/courseEditor/CourseElementsPicker.vue';
import DropZone from '@/components/courseEditor/DropZone.vue';
import CourseBlocks from '@/components/courseEditor/CourseBlocks.vue';
import Preview from '@/components/courseEditor/Preview.vue';

export default {
	name: 'CourseEditor',
	components: {
		CourseTree,
		CourseElementsPicker,
		DropZone,
		CourseBlocks,
		Preview
	},
	data: function() {
		return {
			account: {},
			course: {},
			mode: 'editor',
			elementType: null,
			elements: [],
			elementIndex: null,
			elementToUpdate: null
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.course = await getCourse(this.$route.query.courseId);
	},
	methods: {
		allowDrop: function(e) {
			e.preventDefault();
		},
		drop: function(e) {
			if (e.dataTransfer.getData('elementType') != '') {
				this.elementToUpdate = null;
				this.elementType = e.dataTransfer.getData('elementType');
			}
		},		
		elementSave: function(e) {
			e.index = this.elements.length;
			
			this.elements.push(e);
			this.elementType = null;
		},
		blockUpdate: function(e) {
			this.elementToUpdate = e;
			this.elementType = e.type;
		},
		elementUpdate: function(e) {
			this.elements[e.index] = e;

			this.elementToUpdate = null;
			this.elementType = null;
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

	#dropZone {
		border: 1px solid;
		height: 25%;
	}

	#blocks {
		border: 1px solid;
		height: 25%;
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