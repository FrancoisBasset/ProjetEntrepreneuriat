import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
	device: null,
	remoteService: null,
	joystickCharacteristic: null
});

const vue = new Vue({
	router,
	render: function (h) {
		return h(App);
	},
	store: store
});

Vue.prototype.$URL_API = 'http://localhost';

vue.$mount('#app');