<template>
	<div id="bar">
		<router-link to="/" class="link">
			<Logo />
		</router-link>
		
		<router-link class="link" id="formationsLink" to="/formations">Formations</router-link>
		<router-link class="link" id="certificationsLink" to="/certifications">Certifications</router-link>
		<router-link class="link" id="professionnalsLink" to="/professionnals">Professionnels</router-link>

		<div id="buttons">
			<router-link class="link" to="/signup" style="height!: 100%">
				<button id="signUpButton">Créer un compte</button>
			</router-link>
			<router-link class="link" to="/signin">
				<button id="signInButton">Connexion</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import Logo from '@/components/utils/Logo.vue';

export default {
	name: 'MenuBar',
	components: {
		Logo
	}
}
</script>

<style scoped>
	#bar {
		display: inline-flex;
		width: 100%;
		background-color: chocolate;
		align-items: center;
	}

	.link {
		font-size: 20px;
		color: white;
		text-decoration: none;
	}

	#formationsLink {
		margin-left: 50px;
	}

	#certificationsLink {
		margin-left: 50px;
	}

	#professionnalsLink {
		margin-left: 50px;
	}

	#signUpButton, #signInButton {
		margin-right: 5px;
		margin-top: 5px;
		margin-left: 10px;
		border: none;

		background-color: darkslateblue;
		color: white;
		font-size: 15px;

		height: 30px;

		cursor: pointer;
	}

	#buttons {
		position: fixed;
		top: 0px;
		right: 0px;
	}
</style>