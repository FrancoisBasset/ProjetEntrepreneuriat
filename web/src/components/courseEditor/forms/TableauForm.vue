<template>
	<div>
		Longueur : <input id="width" type="number" v-model="elementToUpdate.data.width" min="1" v-on:change="changeDimension" />
		Hauteur : <input id="height" type="number" v-model="elementToUpdate.data.height" min="1" v-on:change="changeDimension" />

		<Tableau :array="elementToUpdate.data.array" :tableKey="tableKey" />
	</div>
</template>

<script>
import Tableau from '@/components/courseEditor/Tableau.vue';

export default {
	name: 'TableauForm',
	components: {
		Tableau
	},
	props: [
		'elementToUpdate'
	],
	data: function() {
		return {
			tableKey: 0
		};
	},
	methods: {
		changeDimension: function(e) {
			const axis = e.target.id;			

			this.elementToUpdate.data.width = parseInt(this.elementToUpdate.data.width);
			this.elementToUpdate.data.height = parseInt(this.elementToUpdate.data.height);

			if (axis == 'width') {
				const diff = this.elementToUpdate.data.width - this.elementToUpdate.data.array[0].length;
				const arrayLength = this.elementToUpdate.data.array.length;

				if (diff > 0) {
					for (var i = 0; i < arrayLength; i++) {
						for (var j = 0; j < diff; j++) {
							this.elementToUpdate.data.array[i].push('');
						}
					}
				} else {
					for (var i = 0; i < this.elementToUpdate.data.array.length; i++) {
						for (var j = 0; j < -diff; j++) {
							this.elementToUpdate.data.array[i].pop();
						}
					}
				}
			}

			if (axis == 'height') {
				const diff = this.elementToUpdate.data.height - this.elementToUpdate.data.array.length;

				if (diff > 0) {
					var line = [];

					for (var i = 0; i < this.elementToUpdate.data.width; i++) {
						line.push('');
					}

					for (var i = 0; i < diff; i++) {
						this.elementToUpdate.data.array.push(line);
					}
				} else {
					for (var i = 0; i < -diff; i++) {
						this.elementToUpdate.data.array.pop();
					}
				}
			}

			this.tableKey++;
		}
	}
}
</script>