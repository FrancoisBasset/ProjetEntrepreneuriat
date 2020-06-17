<template>
	<div id="formZone" v-on:drop="load" v-on:dragover="allowDrop">
		<div v-if="elementToUpdate.data.src != null">
			<div>
				<img v-if="type == 'Image'" :src="elementToUpdate.data.src" height="150" />

				<video controls autoplay muted v-if="type == 'Vidéo'" height="150">
					<source :src="elementToUpdate.data.src" />
				</video>
			</div>
			<div>
				<label>Largeur</label>
				
				<input type="number" v-model="elementToUpdate.data.width" maxlength="4" />
			</div>
			<div>
				<label>Hauteur</label>
				
				<input type="number" v-model="elementToUpdate.data.height" />
			</div>
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