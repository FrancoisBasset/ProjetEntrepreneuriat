<template>
	<div>
		<HomeBar />

		<h2>Total des gains : {{ totalAmount }} €</h2>

		<table>
			<thead>
				<tr>
					<td>ID</td>
					<td>Montant</td>
					<td>Produit</td>
					<td>Date de paiement</td>
					<td>Client</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="payment of payments" :key="payment.id">
					<td>{{ payment.id }}</td>
					<td>{{ payment.amount }}</td>
					<td>Compte {{ payment.item }}</td>
					<td>{{ new Date(payment.createdAt).toLocaleString() }}</td>
					<td>{{ payment.accountId }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'OperatorPayments',
	components: {
		HomeBar
	},
	data: function() {
		return {
			totalAmount: 0,
			payments: null
		};
	},
	created: async function() {
		const response = await fetch('http://localhost/accounts/pay');
		const json = await response.json();
		this.payments = json.response;

		for (const payment of this.payments) {
			this.totalAmount += payment.amount;
		}

		this.totalAmount = Math.round(this.totalAmount * 100) / 100
	}
}
</script>

<style scoped>

</style>