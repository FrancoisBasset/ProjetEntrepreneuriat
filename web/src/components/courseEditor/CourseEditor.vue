<template>
	<div>
		<CourseTree id="courseTree" :chapters="course.chapters" />
		<CourseElementsPicker id="courseElementsPicker" v-on:typeClick="typeClick" />

		<div id="bottomButtons">
			<div id="editorButtonDiv">
				<button id="editorButton" v-on:click="mode = 'editor'">Editeur</button>
			</div>
			<div id="previewButtonDiv">
				<button id="previewButton" v-on:click="mode = 'preview'">Preview</button>
			</div>
		</div>
		
		<div v-if="mode == 'editor'" id="board">
			<FormZone id="formZone" :key="formZoneKey" :elementType="elementType" :elementToUpdate="elementToUpdate" v-on:elementSave="elementSave" v-on:elementUpdate="elementUpdate" />
			<CourseBlocks id="blocks" :elements="elements" v-on:blockUpdate="blockUpdate" v-on:blockDelete="blockDelete" />
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
			mode: 'editor',
			elementType: null,
			elements: [],
			elementIndex: null,
			elementToUpdate: null,

			formZoneKey: 0
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.course = await getCourse(this.$route.query.courseId);
	},
	methods: {
		typeClick: function(e) {
			this.elementType = e;
			this.elementToUpdate = null;

			this.formZoneKey++;
		},		
		elementSave: function(e) {
			e.index = this.elements.length;
			
			this.elements.push(e);
			this.elementToUpdate = e;
		},
		blockUpdate: function(e) {
			this.elementToUpdate = e;
			this.elementType = e.type;
		},
		blockDelete: function(e) {
			this.elements.splice(e, 1);

			if (e == this.elementToUpdate.index) {
				this.elementToUpdate = null;
			}

			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].index = i;
			}

			this.formZoneKey++;
		},
		elementUpdate: function(e) {
			this.elements[e.index] = e;
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