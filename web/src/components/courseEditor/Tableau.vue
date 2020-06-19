<template>
	<div>
		<table border="1" :key="tableKey">
			<tr v-for="line of Array.from(Array(array.length).keys())" :key="`${tableKey}line${line}`">
				<td v-for="column of Array.from(Array(array[0].length).keys())" :key="`${tableKey}column${line}_${column}`" >
					<input type="text" v-model="array[line][column]"  />
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Tableau',
	props: [
		'tableKey',
		'array'
	]
}
</script>