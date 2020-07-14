import ProfessionnalHome from '@/views/professionnal/ProfessionnalHome.vue';
import CourseForm from '@/views/professionnal/CourseForm.vue';
import CourseEditorPage from '@/views/professionnal/CourseEditorPage.vue';
import ClassForm from '@/views/professionnal/ClassForm.vue';

import ClientHome from '@/views/client/ClientHome.vue';
import CourseStart from '@/views/client/CourseStart.vue';
import CourseView from '@/views/client/CourseView.vue';
import ClassStart from '@/views/client/ClassStart.vue';

import OperatorHome from '@/views/operator/OperatorHome.vue';
import OperatorUsers from '@/views/operator/OperatorUsers.vue';
import OperatorPayments from '@/views/operator/OperatorPayments.vue';
import OperatorCommunications from '@/views/operator/OperatorCommunications.vue';
import OperatorFormations from '@/views/operator/OperatorFormations.vue';
import OperatorCertifications from '@/views/operator/OperatorCertifications.vue';

import ClassRoom from '@/views/ClassRoom.vue';

import MyProfile from '@/views/MyProfile.vue';

import OrganizationHome from '@/views/organization/OrganizationHome.vue';

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
		path: '/classStart',
		name: 'classStart',
		component: ClassStart
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
	},
	{
		path: '/classroom',
		name: 'classroom',
		component: ClassRoom
	},
	{
		path: '/home',
		name: 'organizationHome',
		component: OrganizationHome
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