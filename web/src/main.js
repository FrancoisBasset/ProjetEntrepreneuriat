import Vue from 'vue';
import App from './App.vue';
import router from './router';
import AsyncComputed from 'vue-async-computed';

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

const vue = new Vue({
	router,
	render: function (h) {
		return h(App);
	}
});

vue.$mount('#app');