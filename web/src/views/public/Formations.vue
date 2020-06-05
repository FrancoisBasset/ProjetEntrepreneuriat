<template>
	<div id="div">
		<MenuBar />
		<br>
	
		<p>Cette solution d'apprentissage en ligne fournit des formations certifiantes et non-certifiantes sur une multitude de domaines et de sujets disponibles.</p>
		<p>Cette plateforme fournit des formations sur les domaines suivants : Histoire, Géographie, Informatique et bien d'autres !</p>
		<p>Les formations sont découpées en domaines puis en branches, en cours et enfin en chapitres</p>

		<div>
			
			<Sections />
		</div>
	</div>
</template>

<script>
import MenuBar from '@/components/utils/MenuBar.vue';
import Sections from '@/components/Sections.vue';

export default {
	name: 'Formations',
	components: {
		MenuBar,
		Sections
	}
}
</script>

<style scoped>
	div {
		text-align: center;
	}

	p {
		font-size: 20px;
	}
</style>