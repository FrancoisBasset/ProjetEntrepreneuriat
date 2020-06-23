import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';
import CourseForm from '@/views/private/CourseForm.vue';
import CourseEditorPage from '@/views/private/CourseEditorPage.vue';

import ClientHome from '@/views/private/ClientHome.vue';
import CourseStart from '@/views/private/CourseStart.vue';
import CourseView from '@/views/private/CourseView.vue';

const routes = [
	{
		path: '/home',
		name: 'clientHome',
		component: ClientHome
	},
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
	}, {
		path: '/courseStart',
		name: 'courseStart',
		component: CourseStart
	}, {
		path: '/courseView',
		name: 'courseView',
		component: CourseView
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