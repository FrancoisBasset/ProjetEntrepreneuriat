<template>
	<div id="elements">
		<div v-for="element of elements" :key="`element${element.index}`">
			<CourseBlock :element="element" :index="element.index" />
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
		'elements'
	]
}
</script>

<style scoped>
	
</style>