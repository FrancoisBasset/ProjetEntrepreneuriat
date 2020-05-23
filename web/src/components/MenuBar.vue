<template>
	<div>
		<router-link to="/" class="link">
			<Logo />
		</router-link>

		<router-link class="link" id="formationsLink" to="/formations">Formations</router-link>
		<router-link class="link" id="certificationsLink" to="/certifications">Certifications</router-link>
		<router-link class="link" id="professionnalsLink" to="/professionnals">Professionnels</router-link>

		<router-link class="link" id="signUpLink" to="/signup">
			<button>Créer un compte</button>
		</router-link>
		<router-link class="link" id="signInLink" to="/signin">
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
		height: 10%;
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

	#signUpLink {
		right: 0px;
	}

	#signInLink {
		margin-right: 0px;
	}
</style>