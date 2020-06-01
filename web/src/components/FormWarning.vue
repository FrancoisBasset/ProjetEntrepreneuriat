<template>
	<label v-if="success">✅</label>
	<label v-else>❌</label>
</template>

<script>
export default {
	name: 'FormWarning',
	props: [
		'success',
		'message',
	]
}
</script>