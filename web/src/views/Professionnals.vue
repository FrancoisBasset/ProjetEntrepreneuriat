<template>
	<div style="text-align: center">
		<MenuBar />
		<br>
		

		<h3>Pour les professionnels nous avons des outils permettant de construire leurs cours de A à Z</h3>

		<h3>Par exemple, cet écran permet de créer le cours</h3>
		
		<img src="../assets/professionnal.jpg" height="600" style="border: 1px solid black" />

		<h3>Cet autre écran est notre éditeur de cours</h3>

		<img src="../assets/professionnal2.jpg" height="600" style="border: 1px solid black" />
	</div>
</template>

<script>
import MenuBar from '@/components/utils/MenuBar.vue';

export default {
	name: 'Professionnals',
	components: {
		MenuBar
	}
};
</script>