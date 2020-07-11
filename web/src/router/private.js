import ProfessionnalHome from '@/views/private/ProfessionnalHome.vue';
import CourseForm from '@/views/private/CourseForm.vue';
import CourseEditorPage from '@/views/private/CourseEditorPage.vue';
import ClassForm from '@/views/private/ClassForm.vue';

import ClientHome from '@/views/client/ClientHome.vue';
import CourseStart from '@/views/client/CourseStart.vue';
import CourseView from '@/views/client/CourseView.vue';

import OperatorHome from '@/views/private/OperatorHome.vue';
import OperatorUsers from '@/views/private/OperatorUsers.vue';
import OperatorPayments from '@/views/private/OperatorPayments.vue';
import OperatorCommunications from '@/views/private/OperatorCommunications.vue';
import OperatorFormations from '@/views/private/OperatorFormations.vue';
import OperatorCertifications from '@/views/private/OperatorCertifications.vue';

import MyProfile from '@/views/private/MyProfile.vue';

const routes = [
	{
		path: '/home',
		name: 'operatorHome',
		component: OperatorHome
	},
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
	},
	{
		path: '/classForm',
		name: 'classForm',
		component: ClassForm
	},
	{
		path: '/courseStart',
		name: 'courseStart',
		component: CourseStart
	},
	{
		path: '/courseView',
		name: 'courseView',
		component: CourseView
	},
	{
		path: '/home/utilisateurs',
		name: 'operatorUsers',
		component: OperatorUsers
	},
	{
		path: '/home/paiements',
		name: 'operatorPayments',
		component: OperatorPayments
	},
	{
		path: '/home/communications',
		name: 'operatorCommunications',
		component: OperatorCommunications
	},
	{
		path: '/home/formations',
		name: 'operatorFormations',
		component: OperatorFormations
	},
	{
		path: '/home/certifications',
		name: 'operatorCertifications',
		component: OperatorCertifications
	},
	{
		path: '/profile',
		name: 'profile',
		component: MyProfile
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