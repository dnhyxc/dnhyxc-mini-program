<template>
	<div v-if="false" class="code-wrap-loading">
		<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
	</div>
	<scroll-view v-else :scroll-into-view="scrollIntoId" :scroll-into-view-offset="0" enable-flex class="code-wrap"
		ref="scrollRef" scroll-y="true" enable-passive @scroll="onScroll">
		dnhyxc-blog
	</scroll-view>
</template>

<script setup lang="ts">
	import { watch, ref, toRaw, onMounted, nextTick } from 'vue';

	const scrollIntoId = ref<string>('')
	const scrollTop = ref<number>(0)

	onMounted(() => {

	})

	const onScrollTo = () => {
		scrollIntoId.value = 'poem-0';
	};

	const onScroll = (e : any) => {
		scrollIntoId.value = '';
		scrollTop.value = e.detail.scrollTop;
	}
</script>

<style scoped lang="scss">
	@import '@/styles/index.scss';

	.code-wrap {
		padding: 0 10px;
		box-sizing: border-box;
		background-color: $bg;
		min-height: 100vh;
	}

	.code-wrap-loading {
		height: 100vh;
		background: $bg-color;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;

		:deep {
			.u-loading-icon__text {
				font-size: 18px !important;
				color: #5782ff !important;
				margin-top: 15px !important;
			}
		}
	}
</style>