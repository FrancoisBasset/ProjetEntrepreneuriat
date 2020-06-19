<template>
	<div>
		<div id="fiddle"></div>
	</div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
	name: 'Fiddle',
	props: [
		'code',
		'language'
	],
	data: function() {
		return {
			editor: null
		};
	},
	mounted: function() {
		const model = monaco.editor.createModel(this.code, this.language);

		this.editor = monaco.editor.create(document.getElementById('fiddle'), {
			model: model,
			dimension: {
				width: 1200,
				height: 300
			}
		});

		this.editor.onDidChangeModelContent(e => {
			this.$emit('codeChange', this.editor.getValue());
		});
	}
}
</script>