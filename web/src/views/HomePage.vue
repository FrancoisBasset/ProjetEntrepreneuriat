<template>
	<div>
		<MenuBar />
		
		<Domains />
		<Features />
		<Tarifications />
	</div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import Domains from '@/components/homepage/Domains.vue';
import Features from '@/components/homepage/features/Features.vue';
import Tarifications from '@/components/homepage/Tarifications.vue';

export default {
	name: 'HomePage',
	components: {
		MenuBar,
		Domains,
		Features,
		Tarifications
	}
};
</script>

<style>
	.div {
		text-align: center;
	}

	.title {
		font-size: 30px;
		font-weight: bold;
	}
</style>