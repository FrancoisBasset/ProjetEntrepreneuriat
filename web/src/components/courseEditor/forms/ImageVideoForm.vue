<template>
	<div id="dropZone" v-on:drop="load" v-on:dragover="allowDrop">
		<div v-if="src != null">
			<div>
				<img :src="src" height="150" />
			</div>
			<div>
				<label>Largeur</label>
				<input type="number" v-model="width" maxlength="4" />
			</div>
			<div>
				<label>Hauteur</label>
				<input type="number" v-model="height" />
			</div>
			
			<button v-on:click="save">OK</button>
		</div>
		<div v-else>
			<label v-if="type == 'Image'">Déposez l'image ici !</label>
			<label v-if="type == 'Vidéo'">Déposez la vidéo ici !</label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ImageVideoForm',
	props: {
		'mode': {
			default: 'create'
		},
		'type': {}
	},
	data: function() {
		return {
			src: null,
			width: null,
			height: null
		};
	},
	created: function() {
		this.src = null;
	},
	methods: {
		allowDrop: function(e) {
			e.preventDefault();
		},
		load: function(e) {
			e.preventDefault();
			
			const file = e.dataTransfer.files[0];
			const reader = new FileReader();			
			
			reader.onload = e => {
				this.src = e.target.result;				
			};
			
			reader.readAsDataURL(file);
		},
		save: function() {
			this.$parent.$emit('elementSave', {
				type: this.type,
				data: {
					src: this.src,
					width: this.width,
					height: this.height
				}
			});
		}
	}
}
</script>

<style scoped>
	div {
		text-align: center;
	}

	#dropZone {
		width: 100%;
		height: 100%;
	}
</style>