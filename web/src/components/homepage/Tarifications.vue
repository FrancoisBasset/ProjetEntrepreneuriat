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
				<tr class="even">
					<td>Quelques cours en ligne</td>
					<td>✅</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="notEven">
					<td>Suivi des cours avec télécommande</td>
					<td>✅</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="even">
					<td>QCM</td>
					<td>✅</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="notEven">
					<td>Tous les cours</td>
					<td>❌</td>
					<td>✅</td>
					<td>✅</td>
				</tr>
				<tr class="even">
					<td>Classes virtuelles</td>
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
					<td id="tarif">9.99 €</td>
					<td id="tarif">49.99 €</td>
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