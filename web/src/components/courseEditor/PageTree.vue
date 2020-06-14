<template>
	<div>
		<div id="div">
			<div id="pageButton" v-on:click="pageClick" :class="{ pageSelected: pageSelected == page.id }">
				<label>Page {{ page.index + 1 }}</label>
			</div>
			<button v-on:click="pageRemove">-</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageTree',
	props: [
		'page',
		'pageSelected'
	],
	methods: {
		pageClick: function() {
			this.$parent.$emit('pageClick', this.page);
			this.$parent.$parent.$emit('pageClick', this.page);
		},
		pageRemove: function() {
			fetch(`http://localhost/sections/pages/${this.page.id}`, {
				method: 'DELETE'
			}).then(() => {
				this.$emit('pageRemove', this.page);
				this.$parent.$parent.$emit('pageRemove', this.page);
			});
		}
	}
}
</script>

<style scoped>
	#div {
		display: inline-flex;
	}

	#pageButton {
		border: 1px solid;
		padding: 20px;
		margin: 3px;
	}

	.pageSelected {
		background-color: mediumseagreen;
	}
</style>