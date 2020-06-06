import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';
import CourseForm from '@/views/private/CourseForm.vue';
import CourseEditor from '@/views/private/CourseEditor.vue';

const routes = [
	{
		path: '/home',
		name: 'professionnalHome',
		component: ProfessionnalHome
	},
	{
		path: '/courseForm',
		name: 'courseForm',
		component: CourseForm
	},
	{
		path: '/courseEditor',
		name: 'courseEditor',
		component: CourseEditor
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