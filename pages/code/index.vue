<template>
	<view class="code-wrap">
		<div v-if="codeStore.loading" class="loading">
			<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
		</div>
		<u-list lowerThreshold="10" @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in codeStore.codeList" :key="index">
				<u-cell :title="item.title" @click="toDetail(item)">
				</u-cell>
			</u-list-item>
			<div v-if="noMore" class="no-more">没有更多了</div>
		</u-list>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, computed } from 'vue';
	import { useCodeStore } from '../../stores/code'
	import { CodeItem } from '../../typings';

	const codeStore = useCodeStore()

	const noMore = computed(() => {
		const { total, codeList, pageSize } = codeStore
		return codeList.length >= total && codeList.length && total > pageSize
	})

	onMounted(() => {
		loadMore();
	})

	const scrolltolower = () => {
		loadMore();
	}

	const loadMore = async () => {
		await codeStore.getCodeList()
	}

	const toDetail = (item : CodeItem) => {
		// @ts-ignore
		uni.navigateTo({
			url: `/pages/codesnippet/index?id=${item.id}` // 注意斜杠开头
		});
	}
</script>

<style scoped lang="scss">
	@import '@/styles/index.scss';

	.code-wrap {
		position: relative;
		padding: 0 10px;
		box-sizing: border-box;
		background-color: $bg;
		min-height: 100vh;

		.loading {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.1);
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

		.code-item {
			display: flex;
			align-items: center;
			padding: 10px 0;
			box-sizing: border-box;
			border-bottom: 1px solid red;

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 16px;
					font-weight: 700;
					@include ellipsis;
				}
			}
		}

		.no-more {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 38px;
			color: #666;
		}
	}
</style>