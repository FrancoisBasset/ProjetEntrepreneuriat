<template>
	<div id="docx"></div>
</template>

<script>
import mammoth from 'mammoth';

export default {
	name: 'DOCX',
	props: [
		'base64'
	],
	mounted: function() {
		const base64Path = this.base64.split(';base64,').pop();
		const buffer = Buffer.from(base64Path, 'base64');

		mammoth.convertToHtml({
			arrayBuffer: buffer
		}).then(result => {
			document.getElementById('docx').innerHTML = result.value;
		});
	}
}
</script>