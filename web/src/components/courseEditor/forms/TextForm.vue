<template>
	<div>
		<label>Texte :</label>
		<br>
		<textarea v-if="elementToUpdate == null" v-model="text"></textarea>
		<textarea v-else v-model="elementToUpdate.data.text"></textarea>
		<br>
		<button v-if="elementToUpdate == null" v-on:click="save">OK</button>
		<button v-if="elementToUpdate != null" v-on:click="update">OK</button>
	</div>
</template>

<script>
export default {
	name: 'TextForm',
	props: {
		'elementToUpdate': {
			default: {}
		}
	},
	data: function() {
		return {
			text: ''
		};
	},
	methods: {
		save: function() {
			this.$parent.$emit('elementSave', {
				type: 'Texte',
				data: {
					text: this.text
				}
			});
		},
		update: function() {
			this.$parent.$emit('elementUpdate', this.elementToUpdate);
		}
	}
}
</script>

<style scoped>
	div {
		text-align: center;
	}

	textarea {
		width: 80%;
		height: 150px;
	}
</style>