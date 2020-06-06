<template>
	<div id="homebar">
		<label>{{ account.firstName }} {{ account.lastName }}</label>
		
		<router-link id="link" to="/home">
			<Logo />
		</router-link>
	</div>
</template>

<script>
import Logo from '@/components/utils/Logo.vue';

export default {
	name: 'Homebar',
	components: {
		Logo
	},
	props: [
		'account'
	]
}
</script>

<style scoped>
	#homebar {
		text-align: center;
	}

	#link {
		text-decoration: none;
	}
</style>