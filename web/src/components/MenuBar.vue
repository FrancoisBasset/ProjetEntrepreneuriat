<template>
	<div>
		<router-link to="/">
			<Logo />
		</router-link>

		<router-link class="link" id="formationsLink" to="/formations">Formations</router-link>
		<router-link class="link" id="certificationsLink" to="/certifications">Certifications</router-link>
		<router-link class="link" id="professionnalsLink" to="/professionnals">Professionnels</router-link>

		<router-link class="link" id="inscriptionLink" to="/inscription">
			<button>Inscription</button>
		</router-link>
		<router-link class="link" id="connectionLink" to="/connection">
			<button>Connexion</button>
		</router-link>
	</div>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
	name: 'MenuBar',
	components: {
		Logo
	}
}
</script>

<style scoped>
	div {
		display: inline-flex;
		width: 100%;
		height: 120px;
		background-color: burlywood;
	}

	.link {
		font-size: 40px;
		color: black;
		text-decoration: none;
		vertical-align: middle;
	}

	#formationsLink {
		margin-left: 100px;
	}

	#certificationsLink {
		margin-left: 100px;
	}

	#professionnalsLink {
		margin-left: 100px;
	}

	#inscriptionLink {
		margin-right: 0px;
	}

	#connectionLink {
		right: 0px;
		margin-right: 0px;
	}
</style>