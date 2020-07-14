<template>
	<div>
		<HomeBar home="clientHome" />

		<!--<label>{{ account }}</label>-->

		<h1>{{ course.name }}</h1>
		<br>
		<img v-if="course.image != null" :src="`http://localhost/assets/images/${course.image}`" height="100" />
		<h3>Difficulté</h3>
		<div v-for="i of Array.from(Array(5).keys())" :key="`difficulty${i}`" style="display: inline-flex">
			<label v-if="course.difficulty > i">★</label>
			<label v-else>☆</label>
		</div>

		<h3>Objectifs</h3>
		<div v-for="objective of course.objectives" :key="objective">
			<label>- {{ objective }}</label>
			<br>
		</div>
		<label v-if="course.objectives != null && course.objectives.length == 0">Aucun</label><br><br>

		<div v-if="paying && !medium && !owned">
			<label style="font-size: 20px; color: red">Ce cours est réservé aux comptes 'medium'</label>
		</div>
		<div v-else>
			<button v-if="started" v-on:click="start">Continuer le cours</button>
			<button v-else v-on:click="start">Commencer le cours</button>

			<button v-if="favorite" v-on:click="setFavorite(false)">Retirer le favoris ★</button>
			<button v-else v-on:click="setFavorite(true)">Mettre en favoris ☆</button>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import { getAccount, getCourse } from '@/utils/promises';

export default {
	name: 'CourseStart',
	components: {
		HomeBar
	},
	props: [
		
	],
	data: function() {
		return {
			account: {},
			course: {},
			owned: false,
			paying: false,
			started: false,
			favorite: false,

			medium: false
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.course = await getCourse(this.$route.query.courseId);

		this.paying = this.course.paying;

		for (const course of this.account.courses) {
			if (course.id == this.course.id) {
				this.owned = true;
				this.started = course.clients_courses.started;
				this.favorite = course.clients_courses.favorite;
			}			
		}

		for (const payment of this.account.payments) {
			if (payment.item == 'medium') {
				this.medium = true;
				break;
			}
		}
	},
	methods: {
		start: async function() {
			fetch(`http://localhost/sections/courses/${this.course.id}/start`, {
				method: 'POST'
			}).then(response => {
				response.json().then(json => {
					if (json.success) {
						this.started = true;
					}
				});
			});

			const course = this.course;

			await this.prepareBLE();
			
			this.$router.push({
				name: 'courseView',
				params: {
					course
				}
			});
		},
		setFavorite: function(favorite) {
			var method = '';
			if (favorite) {
				method = 'POST';
			} else {
				method = 'DELETE';
			}

			fetch(`http://localhost/sections/courses/${this.course.id}/favorite`, {
				method: method
			}).then(response => {
				response.json().then(json => {
					if (json.success) {
						this.favorite = favorite;
					}
				});
			});
		},
		prepareBLE: async function() {
			if (this.$store.device == null) {
				this.$store.device = await navigator.bluetooth.requestDevice({
					filters: [
						{
							name: 'Raspberry Pi'
						}
					],
					optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']
				}).catch(() => {
					return null;					
				});

				if (this.$store.device == null) {
					return;
				}				
			}
			
			await this.$store.device.gatt.connect()

			this.$store.remoteService = await this.$store.device.gatt.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
			this.$store.joystickCharacteristic = await this.$store.remoteService.getCharacteristic('0000fff1-0000-1000-8000-00805f9b34fb');
			await this.$store.joystickCharacteristic.startNotifications();
		}
	}
}
</script>