import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/HomePage.vue';

import Formations from '@/views/Formations.vue';
import Certifications from '@/views/Certifications.vue';
import Professionnals from '@/views/Professionnals.vue';

import SignUp from '@/views/SignUp.vue';
import SignIn from '@/views/SignIn.vue';

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
		path: '/signup',
		name: 'signup',
		component: SignUp
	},
	{
		path: '/signin',
		name: 'signin',
		component: SignIn
	}
];

const router = new VueRouter({
	routes
});

export default router;