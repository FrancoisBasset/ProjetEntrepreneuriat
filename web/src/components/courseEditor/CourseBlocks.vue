<template>
	<div id="elements" v-on:dragover="allowDrop">
		<div v-for="element of elements" :key="element.index" :id="element.index" v-on:dragstart="drag" v-on:drop="drop">
			<CourseBlock :id="element.index" draggable="true" :element="element" :index="element.index" :selected="selectedBlock != null && selectedBlock.index == element.index" />
		</div>
	</div>
</template>

<script>
import CourseBlock from '@/components/courseEditor/CourseBlock.vue';

export default {
	name: 'CourseBlocks',
	components: {
		CourseBlock
	},
	props: [
		'selectedBlock',
		'elements'
	],
	methods: {
		allowDrop: function(e) {
			e.preventDefault();
		},
		drag: function(e) {
			e.dataTransfer.setData('blockId', e.target.id);
		},
		drop: function(e) {
			const from = e.dataTransfer.getData('blockId');
			const to = e.target.parentElement.parentElement.id;

			this.$emit('blockDrop', {
				from: from,
				to: to
			});
		}
	}
}
</script>

<style scoped>
	
</style>