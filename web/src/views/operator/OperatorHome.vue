<template>
	<div>
		<HomeBar home="operatorHome" />
		
		<div id="buttons">
			<router-link :to="{ name: 'operatorUsers' }">
				<button class="button">Gestion des utilisateurs</button>
			</router-link>

			<router-link :to="{ name: 'operatorPayments' }">
				<button class="button">Gestion des paiements</button>
			</router-link>
			
			<router-link :to="{ name: 'operatorCommunications' }">
				<button class="button">Gestion des communications</button>
			</router-link>

			<router-link :to="{ name: 'operatorFormations' }">
				<button class="button">Gestion des formations</button>
			</router-link>

			<router-link :to="{ name: 'operatorCertifications' }">
				<button class="button">Certifications</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'OperatorHome',
	components: {
		HomeBar
	}
}
</script>

<style scoped>
	#buttons {
		text-align: center;
	}

	.button {
		padding: 40px;
		margin: 10px;
		border-radius: 40px;
		vertical-align: bottom;
		cursor: pointer;
	}
</style>