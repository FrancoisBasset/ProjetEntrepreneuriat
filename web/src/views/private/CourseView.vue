<template>
	<div>
		<HomeBar />

		<h1>{{ this.course.name }}</h1>
		<h3>{{ this.chapter.name }}</h3>

		<button v-on:click="goToPrevious">Page précédente</button>
		<button v-on:click="goToNext">Page suivante</button>

		<PageView v-if="page != null" :elements="page.elements" />

		<button v-on:click="goToNext">Page suivante</button>
	</div>
</template>

<script>
import HomeBar from '@/components/utils/HomeBar.vue';
import PageView from '@/components/PageView.vue';
import { getAccount, getCourse, getChapter, getPage } from '@/utils/promises';

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

			previousType: null,
			nextType: null
		};
	},
	created: async function() {
		this.account = await getAccount();
		const courseId = this.$route.params.course.id;
		this.course = await getCourse(courseId);

		if (this.course.chapters.length > 0) {
			const chapterId = this.course.chapters[0].id;
			this.chapter = await getChapter(chapterId);
			
			if (this.chapter.pages.length > 0) {
				this.page = this.chapter.pages[0];
				this.page = await getPage(this.page.id);
			}
		}
	},
	methods: {
		goToPrevious: async function() {
			if (this.page.index == 0 && this.chapter.index > 0) {
				this.chapter = this.course.chapters[this.chapter.index - 1];
				this.chapter = await getChapter(this.chapter.id);

				//console.log(this.chapter);
				
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
		},
		goToNext: async function() {
			if (this.page.index == this.chapter.pages.length - 1 && this.chapter.index < this.course.chapters.length - 1) {
				this.chapter = this.course.chapters[this.chapter.index + 1];
				this.chapter = await getChapter(this.chapter.id);

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
		}
	}
}
</script>