<template>
	<div>
		<HomeBar />

		<div id="root">
			<div id="list">
				<label>Notifications</label>
				<br>

				<select v-model="selected" size="40" style="width: 200px">
					<option v-for="notification of notifications" :key="notification.id" :value="notification">{{ notification.name }}</option>
				</select>
			</div>

			<div id="form">
				<button v-on:click="resetForm">Créer une nouvelle notification</button><br>

				<label>Nom : </label>
				<input type="text" v-model="notification.name" />
				<br>
				
				<label>Message : </label><br>
				<textarea v-model="notification.message" rows="20" cols="50"></textarea>
				<br>

				<button v-if="selected != null && !selected.sent" v-on:click="send">Envoyer</button>
				<button v-if="selected == null || (selected != null && selected.sent == false)" v-on:click="saveNotification">Enregistrer</button>
				<label v-if="selected != null && selected.sent">Envoyé ✅</label>

				<br><label style="color: red">{{ errorMessage }}</label>
			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar';

export default {
	name: 'OperatorCommunications',
	components: {
		HomeBar
	},
	data: function() {
		return {
			notifications: null,
			selected: null,
			notification: {
				name: '',
				message: ''
			},
			errorMessage: ''
		};
	},
	created: async function() {
		this.setNotifications();
	},
	watch: {
		selected: function() {
			if (this.selected != null) {
				this.errorMessage = '';
				this.notification.name = this.selected.name;
				this.notification.message = this.selected.message;
			}

			this.setNotifications();
		}
	},
	methods: {
		setNotifications: async function() {
			const response = await fetch(`http://localhost/notifications`);
			const json = await response.json();
			this.notifications = json.response;
		},
		resetForm: function() {
			this.selected = null;
			this.notification.name = '';
			this.notification.message = '';
		},
		saveNotification: async function() {
			var method = 'POST';
			var url = 'http://localhost/notifications';

			if (this.selected != null) {
				method = 'PUT';
				url += `/${this.selected.id}`;
			}

			const response = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.notification.name,
					message: this.notification.message
				})
			});
			const json = await response.json();

			if (!json.success) {
				this.errorMessage = json.response;
			} else {
				this.selected = json.response;
				this.errorMessage = '';
			}

			this.setNotifications();
		},
		send: async function() {
			const response = await fetch(`http://localhost/notifications/${this.selected.id}/send`, {
				method: 'PUT'
			});
			const json = await response.json();
			this.selected = json.response;

			this.setNotifications();
			
		}
	}
}
</script>

<style scoped>
	#root {
		display: inline-flex;
	}
</style>