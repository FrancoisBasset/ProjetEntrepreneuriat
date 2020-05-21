import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/HomePage.vue';

import Formations from '@/views/Formations.vue';
import Certifications from '@/views/Certifications.vue';
import Professionnals from '@/views/Professionnals.vue';

import Inscription from '@/views/Inscription.vue';
import Connection from '@/views/Connection.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage
	},
	{
		path: '/formations',
		name: 'formations',
		component: Formations
	},
	{
		path: '/certifications',
		name: 'certifications',
		component: Certifications
	},
	{
		path: '/professionnals',
		name: 'professionnals',
		component: Professionnals
	},
	{
		path: '/inscription',
		name: 'inscription',
		component: Inscription
	},
	{
		path: '/connection',
		name: 'connection',
		component: Connection
	}
];

const router = new VueRouter({
	routes
});

export default router;