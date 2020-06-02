import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/public/HomePage.vue';

import Formations from '@/views/public/Formations.vue';
import Certifications from '@/views/public/Certifications.vue';
import Professionnals from '@/views/public/Professionnals.vue';

import SignUp from '@/views/public/SignUp.vue';
import SignIn from '@/views/public/SignIn.vue';

import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';

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
	},
	{
		path: '/home',
		name: 'professionnalHome',
		component: ProfessionnalHome
	}
];

const router = new VueRouter({
	routes
});

export default router;