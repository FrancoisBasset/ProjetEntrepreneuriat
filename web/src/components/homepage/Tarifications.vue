<template>
	<div class="div">
		<label class="title">Tarifications</label>
		<br><br>

		<table>
			<thead>
				<tr>
					<td></td>
					<td class="tarificationHeader">Standard</td>
					<td class="tarificationHeader">Medium</td>
					<td class="tarificationHeader">Premium</td>
				</tr>
			</thead>
			<tbody>
				<tr class="notEven">
					<td>Quelques cours en ligne</td>
					<td>✅</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="even">
					<td>Tous les cours</td>
					<td>❌</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="notEven">
					<td>Exercices</td>
					<td>❌</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="even">
					<td>Tests</td>
					<td>❌</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="notEven">
					<td>Classes virtuelles</td>
					<td>❌</td>
					<td>❌</td>
					<td>✅</td>
				</tr>
				<tr class="even">
					<td>Intelligence artificielle</td>
					<td>❌</td>
					<td>❌</td>
					<td>✅</td>
				</tr>
				<tr class="notEven">
					<td>Certifications</td>
					<td>❌</td>
					<td>❌</td>
					<td>✅</td>
				</tr>
				<tr id="tarifTr">
					<td id="tarif">Tarif</td>
					<td id="tarif">Gratuit</td>
					<td id="tarif">9.99 € / mois</td>
					<td id="tarif">49.99 € / mois</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Tarifications'
}
</script>

<style scoped>
	table {
		width: 70%;
		margin-left: 15%;
		margin-right: 15%;
	}
	
	.tarificationHeader {
		background-color: gray;
		color: white
	}

	td {
		font-size: 20px;
		height: 50px;
		padding: 0px;
		margin: 0px;
	}

	.notEven {
		background-color: lightblue;
	}

	.even {
		background-color: lightcyan;
	}

	#tarifTr {
		background-color: orange;
	}

	#tarif {
		color: white;
		font-size: 30px;
	}
</style>