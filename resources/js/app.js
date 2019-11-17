/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Form = Form;
import { Form, HasError, AlertError } from 'vform';

window.Fire = new Vue();
// Moment js i for date formating
import moment from 'moment';

// sweetalert componemt
import swal from 'sweetalert2';
window.swal = swal;

const toast = swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
	// timerProgressBar: true,
	// onOpen: (toast) => {
	//   toast.addEventListener('mouseenter', Swal.stopTimer)
	//   toast.addEventListener('mouseleave', Swal.resumeTimer)
	// }
});
window.toast = toast;

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// proogressbar componet
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
	color: '#edd222',
	failedColor: '#874b4b',
	height: '4px'
});

let routes = [
	{
		path: '/dashboard',
		component: require('./components/Dashboard.vue').default
	},

	{
		path: '/profile',
		component: require('./components/Profile.vue').default
	},

	{
		path: '/users',
		component: require('./components/Users.vue').default
	},

	{
		path: '/developer',
		component: require('./components/Developer.vue').default
	}
];

// const options = {
//     color: "#edd222",
//     failedColor: "#874b4b",
//     thickness: "5px",
//     transition: {
//         speed: "2s",
//         opacity: "0.6s",
//         termination: 300
//     },
//     autoRevert: true,
//     location: "left",
//     inverse: false
// };

const router = new VueRouter({
	mode: 'history',
	routes // short for `routes: routes`
});

// This to format the dates and strings

Vue.filter('textCapitalsed', function(text) {
	if (!text) return '';
	text = text.toString();
	return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('formatDate', function(created) {
	return moment(created).format('MMM Do YY');
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('passport-clients', require('./components/passport/Clients.vue').default);

Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue').default);

Vue.component('passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue').default);

const app = new Vue({
	el: '#app',
	router
});
