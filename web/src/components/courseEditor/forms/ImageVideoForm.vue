<template>
	<div id="formZone" v-on:drop="load" v-on:dragover="allowDrop">
		<div v-if="src != null || elementToUpdate != null">
			<div>
				<img v-if="elementToUpdate == null && type == 'Image'" :src="src" height="150" />
				<img v-if="elementToUpdate != null && type == 'Image'" :src="elementToUpdate.data.src" height="150" />

				<video controls v-if="elementToUpdate == null && type == 'Vidéo'" height="150">
					<source :src="src" />
				</video>
				<video controls v-if="elementToUpdate != null && type == 'Vidéo'" height="150">
					<source :src="elementToUpdate.data.src" />
				</video>
			</div>
			<div>
				<label>Largeur</label>
				<input v-if="elementToUpdate == null" type="number" v-model="width" maxlength="4" />
				<input v-else type="number" v-model="elementToUpdate.data.width" maxlength="4" />
			</div>
			<div>
				<label>Hauteur</label>
				<input v-if="elementToUpdate == null" type="number" v-model="height" />
				<input v-else type="number" v-model="elementToUpdate.data.height" />
			</div>
			
			<button v-if="elementToUpdate == null" v-on:click="save">OK</button>
			<button v-else v-on:click="update">OK</button>
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
		'elementToUpdate': {
			default: {}
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
				if (this.elementToUpdate != null) {
					this.elementToUpdate.data.src = e.target.result;
				}
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

	#formZone {
		width: 100%;
		height: 100%;
	}
</style>