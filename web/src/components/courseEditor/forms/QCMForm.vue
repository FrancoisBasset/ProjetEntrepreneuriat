<template>
	<div style="text-align: center">
		Question: <input type="text" v-model="elementToUpdate.data.question" size="100" />

		<div>
			<input type="text" v-model="elementToUpdate.data.answers[0]" />
			<label v-if="elementToUpdate.data.correct == 0">✅</label>
			<label v-else v-on:click="elementToUpdate.data.correct = 0">❌</label>
		</div>
		<div>
			<input type="text" v-model="elementToUpdate.data.answers[1]" />
			<label v-if="elementToUpdate.data.correct == 1">✅</label>
			<label v-else v-on:click="elementToUpdate.data.correct = 1">❌</label>
		</div>
		<div>
			<input type="text" v-model="elementToUpdate.data.answers[2]" />
			<label v-if="elementToUpdate.data.correct == 2">✅</label>
			<label v-else v-on:click="elementToUpdate.data.correct = 2">❌</label>
		</div>
		<div>
			<input type="text" v-model="elementToUpdate.data.answers[3]" />
			<label v-if="elementToUpdate.data.correct == 3">✅</label>
			<label v-else v-on:click="elementToUpdate.data.correct = 3">❌</label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'QCMForm',
	props: [
		'elementToUpdate'
	]
}
</script>