import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const vue = new Vue({
	router,
	render: function (h) {
		return h(App);
	}
});

vue.$mount('#app');