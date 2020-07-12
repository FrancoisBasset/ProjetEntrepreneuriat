<template>
	<div>
		<label>{{ classe }}</label>

		<div v-if="haveChat">
			<div>

			</div>
			<div>
				<input type="text" v-model="toSend" />
				<button>-></button>
			</div>
		</div>

		<div v-if="haveMicrophone">
			Microphone
		</div>

		<div v-if="haveCamera">
			Camera
		</div>

		<div v-if="haveScreen">
			Screen
		</div>

		<div v-if="haveUsers">
			Users
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';

export default {
	name: 'ClassRoom',
	components: {
		HomeBar
	},
	data: function() {
		return {
			home: '',
			classe: null,

			haveChat: false,
			haveMicrophone: false,
			haveCamera: false,
			haveScreen: false,
			haveUsers: false
		};
	},
	created: async function() {
		var response = await fetch(`http://localhost/classes/${this.$route.query.classId}`);
		var json = await response.json();
		this.classe = json.response;

		this.haveChat = this.classe.fonctionnalities.includes('chat');
		this.haveMicrophone = this.classe.fonctionnalities.includes('microphone');
		this.haveCamera = this.classe.fonctionnalities.includes('camera');
		this.haveScreen = this.classe.fonctionnalities.includes('screen');
		this.haveUsers = this.classe.fonctionnalities.includes('users');
	}
}
</script>