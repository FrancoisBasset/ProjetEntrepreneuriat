<template>
	<div>
		<label><b>{{ label }}</b></label>
		<div>
			<input :type="type" v-model="value" />
			<FormWarning v-show="warning" :success="value != null && value != ''" />
		</div>
	</div>
</template>

<script>
import FormWarning from '@/components/utils/FormWarning.vue';

export default {
	name: 'FormLine',
	props: {
		'type': {
			default: 'text'
		},
		'warning': {
			default: false
		},
		'label': {},
		'name': {}
	},
	components: {
		FormWarning
	},
	data: function() {
		return {
			value: null
		};
	},
	watch: {
		value: function(value) {
			this.$emit('formLineChange', [this.name, value]);
		}
	}
}
</script>

<style scoped>
	label {
		font-size: 20px;
	}

	input {
		width: 500px;
		font-size: 20px;
	}
</style>