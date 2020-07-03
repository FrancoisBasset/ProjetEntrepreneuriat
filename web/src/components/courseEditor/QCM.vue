<template>
	<div id="qcm">
		<div class="question">
			<label>{{ question }}</label>
		</div>
		
		<div>
			<div v-for="index of Array.from(Array(answers.length).keys())" :key="index">
				<button class="answer"  v-on:click="respond(index)" :ref="`answer${index}`" :class="{ selected: selected == index }">{{ answers[index] }}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'QCM',
	props: [
		'question',
		'answers',
		'correct',
		'seeFullQcm'
	],
	data: function() {
		return {
			selected: null,
			givenResponse: null
		};
	},
	watch: {
		seeFullQcm: function(val) {
			this.selected = 0;
			if (this.$store.joystickCharacteristic != null && this.seeFullQcm) {
				console.log(this.$store.joystickCharacteristic);
				
				this.$store.joystickCharacteristic.writeValue(Buffer.from('enterQcm'));
				//await this.wait(1);
				this.$store.joystickCharacteristic.oncharacteristicvaluechanged = this.oncharacteristicvaluechanged;
			}
		}
	},
	methods: {
		/*async wait (sec) {
			return new Promise((resolve => {
				setTimeout(() => {
					resolve(true)
				}, 1000 * sec)
			}));
		},*/
		respond: async function(index) {
			if (this.givenResponse == null) {
				this.givenResponse = index;

				if (this.givenResponse != this.correct) {
					this.$refs['answer' + this.givenResponse][0].classList.add('incorrect');
				}

				this.$refs['answer' + this.correct][0].classList.add('correct');

				//await this.$store.joystickCharacteristic.writeValue(Buffer.from('exitQcm'));
			}
		},
		oncharacteristicvaluechanged: function(e) {
			const dataview = this.$store.joystickCharacteristic.value;
			const decoder = new TextDecoder();
			const action = decoder.decode(dataview);

			if (this.givenResponse == null) {
				switch (action) {
					case 'UP':
						if (this.selected > 0) {
							this.selected--;
						}
						break;
					case 'DOWN':
						if (this.selected < this.answers.length - 1) {
							this.selected++;
						}
						break;
					case 'CLICK':
						this.respond(this.selected);
						this.$parent.$emit('qcmRespond');
						break;
				}
			}
		}
	}
}
</script>

<style scoped>
	#qcm {
		width: 100%;
		text-align: center;
	}

	.question, .answer {
		padding: 20px;
		
		color: white;
		background-color: orange;
		font-size: 20px;

		border-radius: 10px;
	}

	.question {
		width: 50%;
		margin-left: 25%;
		margin-right: 25%;
		font-size: 26px;
	}

	.answer {
		cursor: pointer;
		width: 40%;
		border: none;
		outline: none;

		margin: 5px;
	}

	.correct {
		background-color: lime;
	}

	.incorrect {
		background-color: red;
	}

	.selected {
		border: lime 10px solid;
	}
</style>