<template>
	<div>
		<HomeBar :home="home" />
		
		<div id=parts>
			<div v-if="haveChat" style="border: 1px solid black; width: 400px; height: 100%;">
				<div v-for="chat of chats" :key="chat.id">
					<label >{{ chat.account.firstName }} {{ chat.account.lastName }} : {{ chat.value }}</label>
				</div>
				<div>
					<input type="text" v-model="toSend" />
					<button v-on:click="sendMessage">Envoyer</button>
				</div>
			</div>

			<div>

			</div>

			<div>
				{{ classe }}
			</div>
		</div>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import { getAccount, getClass, getChats } from '@/utils/promises';

export default {
	name: 'ClassRoom',
	components: {
		HomeBar
	},
	data: function() {
		return {
			home: '',
			account: null,
			classe: null,

			haveChat: false,
			haveMicrophone: false,
			haveCamera: false,
			haveScreen: false,
			haveUsers: false,

			chats: [],
			toSend: ''
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.classe = await getClass(this.$route.query.classId);

		this.haveChat = this.classe.fonctionnalities.includes('chat');
		this.haveMicrophone = this.classe.fonctionnalities.includes('microphone');
		this.haveCamera = this.classe.fonctionnalities.includes('camera');
		this.haveScreen = this.classe.fonctionnalities.includes('screen');
		this.haveUsers = this.classe.fonctionnalities.includes('users');

		setInterval(async () => {
			this.chats = await getChats(this.$route.query.classId);
		}, 100);

		this.home = this.account.type + 'Home';
	},
	methods: {
		sendMessage: async function() {
			const response = await fetch('http://localhost/chats', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					classId: this.classe.id,
					value: this.toSend
				})
			});
			this.toSend = '';
		}
	}
}
</script>