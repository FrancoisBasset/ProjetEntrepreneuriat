import HomePage from '@/views/public/HomePage.vue';

import Formations from '@/views/public/Formations.vue';
import Certifications from '@/views/public/Certifications.vue';
import Professionnals from '@/views/public/Professionnals.vue';

import SignUp from '@/views/public/SignUp.vue';
import SignIn from '@/views/public/SignIn.vue';

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

export default routes.map(function(route) {
	return {
		...route,
		meta: {
			public: true
		}
	};
});