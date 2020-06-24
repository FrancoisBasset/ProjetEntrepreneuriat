<template>
	<div>
		<HomeBar />

		<h1>{{ course.name }}</h1>
		<br>
		<div v-show="owned">
			<button v-if="started" v-on:click="start">Continuer le cours</button>
			<button v-else v-on:click="start">Commencer le cours</button>

			<button v-if="favorite" v-on:click="setFavorite(false)">Favoris ★</button>
			<button v-else v-on:click="setFavorite(true)">Mettre en favoris ☆</button>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'CourseStart',
	components: {
		HomeBar
	},
	props: [
		
	],
	data: function() {
		return {
			account: null,
			course: null,
			owned: null,
			paying: null,
			started: null,
			favorite: null
		};
	},
	created: async function() {
		this.account = this.$route.params.account;
		this.course = this.$route.params.course;

		for (const course of this.account.courses) {
			if (course.id == this.course.id) {
				this.owned = true;
			}			
		}

		this.paying = this.course.paying;
		this.started = this.course.clients_courses.started;
		this.favorite = this.course.clients_courses.favorite;
	},
	methods: {
		start: function() {
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
		}
	}
}
</script>