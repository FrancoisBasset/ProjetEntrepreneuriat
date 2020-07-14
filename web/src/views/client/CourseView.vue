<template>
	<div>
		<HomeBar home="clientHome" />

		<h1>{{ this.course.name }}</h1>
		<h3>{{ this.chapter.name }}</h3>

		<button v-on:click="goToPrevious">Page précédente</button>

		<router-link v-if="atTheEnd" :to="{ name: 'courseStart', query: { courseId: course.id } }">
			<button>Retour au menu</button>
		</router-link>
		<button v-else v-on:click="goToNext">Page suivante</button>

		<PageView v-if="page != null" :elements="page.elements" v-on:qcmRespond="qcmRespond" />
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import PageView from '@/components/PageView.vue';
import { getAccount, getCourse, getChapter, getPage, getClientsCourses } from '@/utils/promises';

export default {
	name: 'CourseView',
	components: {
		HomeBar,
		PageView
	},
	data: function() {
		return {
			account: {},
			course: {},
			chapter: {},
			page: {},

			courseAccount: {},

			atTheEnd: false
		};
	},
	created: async function() {
		this.account = await getAccount();
		this.courseAccount = this.$route.params.course;

		const courseId = this.courseAccount.id;
		this.course = await getCourse(courseId);

		if (this.course.chapters.length > 0) {
			const chapterId = this.course.chapters[0].id;
			this.chapter = await getChapter(chapterId);

			const clientsCourses = await getClientsCourses(this.course.id);
			if (clientsCourses.chapterId) {
				this.chapter = await getChapter(clientsCourses.chapterId);
			}			
			
			if (this.chapter.pages.length > 0) {
				this.page = this.chapter.pages[0];
				this.page = await getPage(this.page.id);
			}
		}

		if (this.$store.joystickCharacteristic != null) {
			this.$store.joystickCharacteristic.oncharacteristicvaluechanged = this.oncharacteristicvaluechanged;
		}
	},
	methods: {
		goToPrevious: async function() {
			if (this.page.index == 0 && this.chapter.index > 0) {
				this.chapter = this.course.chapters[this.chapter.index - 1];
				this.chapter = await getChapter(this.chapter.id);
				
				if (this.chapter.pages.length > 0) {
					this.page = this.chapter.pages[this.chapter.pages.length - 1];
					this.page = await getPage(this.page.id);
				} else {
					this.page = null;
				}
			} else if (this.page.index > 0) {
				this.page = this.chapter.pages[this.page.index - 1];
				this.page = await getPage(this.page.id);
			}

			this.atTheEnd = false;
		},
		goToNext: async function() {
			if (this.page.index == this.chapter.pages.length - 1 && this.chapter.index < this.course.chapters.length - 1) {
				this.chapter = this.course.chapters[this.chapter.index + 1];
				this.chapter = await getChapter(this.chapter.id);

				//
				var clientsCourses = await getClientsCourses(this.course.id);

				if (clientsCourses.chapterId == null) {
					await fetch(`http://localhost/sections/courses/${this.course.id}/start/${this.chapter.id}`, {
						method: 'POST'
					});
				} else {
					var chapter_index = await getChapter(clientsCourses.chapterId);
					
					if (chapter_index.index < this.chapter.index) {
						await fetch(`http://localhost/sections/courses/${this.course.id}/start/${this.chapter.id}`, {
							method: 'POST'
						});
					}
				}

				if (this.chapter.pages.length > 0) {
					this.page = this.chapter.pages[0];
					this.page = await getPage(this.page.id);
				} else {
					this.page = null;
				}
			} else if (this.page.index < this.chapter.pages.length - 1) {
				this.page = this.chapter.pages[this.page.index + 1];
				this.page = await getPage(this.page.id);
			}

			if (this.chapter.index == this.course.chapters.length - 1 && this.page.index == this.chapter.pages.length - 1) {
				this.atTheEnd = true;
			} else {
				this.atTheEnd = false;
			}
		},
		/*finishCourse: async function() {
			const account = this.account;
			const course = this.courseAccount;

			this.$router.push({
				name: 'courseStart',
				params: {
					account,
					course
				},
				props: true
			})
		},*/
		oncharacteristicvaluechanged: function(e) {
			const dataview = this.$store.joystickCharacteristic.value;
			const decoder = new TextDecoder();
			const action = decoder.decode(dataview);

			switch (action) {
				case 'LEFT':
					this.goToPrevious();
					break;
				case 'RIGHT':
					this.goToNext();
					break;
				case 'UP':
					scroll(scrollX, scrollY - 20);
					break;
				case 'DOWN':
					scroll(scrollX, scrollY + 20);
					break;
			}
		},
		qcmRespond: function(e) {
			this.$store.joystickCharacteristic.oncharacteristicvaluechanged = this.oncharacteristicvaluechanged;
		}
	}
}
</script>