<template>
	<div>
		<HomeBar id="homeBar" :home="home" />

		<div id=parts>
			<div id="chat" v-if="haveChat">
				<div id="messages">
					<div v-for="chat of chats" :key="chat.id">
						<label >{{ chat.account.firstName }} {{ chat.account.lastName }} : {{ chat.value }}</label>
					</div>
				</div>
				<div id="chatInputDiv">
					<div>
						<input id="toSendDiv" type="text" v-model="toSend" autocomplete="off" />
					</div>
					<div>
						<button id="buttonSend" :disabled="toSend.trim() == ''" v-on:click="sendMessage">Envoyer</button>
					</div>
				</div>
			</div>

			<div id="board">
				<div id="toShow">
					
				</div>
				<div id="tools">
					<img v-if="muted" v-on:click="changeMute" src="../assets/muted.png" />
					<img v-else v-on:click="changeMute" src="../assets/unmuted.png" />

					<img v-if="camera" v-on:click="changeCamera" src="../assets/cameraon.png" />
					<img v-else v-on:click="changeCamera" src="../assets/cameraoff.png" />
				</div>
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
			toSend: '',

			document: null,

			muted: true,
			camera: false
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
		},
		changeMute: function() {
			if (this.muted) {
				navigator.getUserMedia({
					audio: true
				}, () => {
					this.muted = !this.muted;
				}, function() {});
			} else {
				this.muted = !this.muted;
			}
		},
		changeCamera: function() {
			if (this.muted) {
				navigator.getUserMedia({
					video: true
				}, () => {
					this.camera = !this.camera;
				}, function() {});
			} else {
				this.camera = !this.camera;
			}
		}
	}
}
</script>

<style>
	#homeBar {
		height: 10%;
	}

	#parts {
		height: 90%;
		display: inline-flex;
	}

	#chat {
		position: fixed;
		border: 1px solid black;
		width: 20%;
		height: 90%;
	}

	#messages {
		height: 95%;
		overflow: auto;
	}

	#chatInputDiv {
		margin-bottom: 0px;
	}

	#toSendDiv {
		width: 98%;
	}

	#buttonSend {
		width: 100%;
	}
	
	#board {
		position: fixed;
		margin-left: 20%;
		height: 90%;
		width: 60%;
		border: 1px solid black;
	}

	#toShow {
		position: fixed;
		margin-left: 0%;
		height: 70%;
		width: 60%;
		border: 1px solid black;
	}

	#tools {
		position: fixed;
		margin-left: 0%;
		
		width: 60%;
		top: 80%;
	}
</style>