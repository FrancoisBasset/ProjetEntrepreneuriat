import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';
import CourseForm from '@/views/private/CourseForm.vue';
import CourseEditorPage from '@/views/private/CourseEditorPage.vue';

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
		component: CourseEditorPage
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