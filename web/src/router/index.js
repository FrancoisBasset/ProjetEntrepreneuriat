import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import publicRoutes from '@/router/public';
import privateRoutes from '@/router/private';

const router = new VueRouter({
	routes: publicRoutes.concat(privateRoutes)
});

router.beforeEach(async function(to, from, next) {
	const isPublic = to.matched.some(route => route.meta.public);
	
	if (!isPublic) {
		const response = await fetch('http://localhost/accounts');

		if (response.status == 401) {
			return next({
				path: '/'
			});
		}
	}

	next();
});

export default router;