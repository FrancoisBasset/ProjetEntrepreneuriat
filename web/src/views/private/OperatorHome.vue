<template>
	<div>
		<HomeBar />

		<router-link :to="{ name: 'operatorUsers' }">
			<button>Gestion des utilisateurs</button>
		</router-link>

		<router-link :to="{ name: 'operatorPayments' }">
			<button>Gestion des paiements</button>
		</router-link>
		
		<router-link :to="{ name: 'operatorCommunications' }">
			<button>Gestion des communications</button>
		</router-link>

		<router-link :to="{ name: 'operatorFormations' }">
			<button>Gestion des formations</button>
		</router-link>

		<router-link :to="{ name: 'operatorCertifications' }">
			<button>Certifications</button>
		</router-link>
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