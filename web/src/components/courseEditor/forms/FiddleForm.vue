<template>
	<div>
		<label>Fiddle :</label>
		Langage :
		<select v-model="elementToUpdate.data.language" v-on:change="fiddleKey++;">
			<option v-for="language of languages" :key="language" :selected="elementToUpdate.data.language">{{ language }}</option>
		</select>

		<Fiddle :key="fiddleKey" :language="elementToUpdate.data.language" :code="elementToUpdate.data.code" v-on:codeChange="changeCode" />
	</div>
</template>

<script>
import Fiddle from '@/components/courseEditor/Fiddle.vue';

export default {
	name: 'FiddleForm',
	components: {
		Fiddle
	},
	props: [
		'elementToUpdate'
	],
	data: function() {
		return {
			languages: ['css', 'javascript'],
			fiddleKey: 0
		}
	},
	mounted: function() {
		
	},
	methods: {
		changeCode: function(e) {
			this.elementToUpdate.data.code = e;
		}
	}
}
</script>