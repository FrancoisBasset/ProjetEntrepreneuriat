import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';
import CreateCourse from '@/views/private/CreateCourse.vue';

const routes = [
	{
		path: '/home',
		name: 'professionnalHome',
		component: ProfessionnalHome
	},
	{
		path: '/createCourse',
		name: 'createCourse',
		component: CreateCourse
	}
];

export default routes.map(function(route) {
	return {
		...route,
		meta: {
			public: false
		}
	};
});