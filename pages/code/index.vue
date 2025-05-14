<template>
	<view class="code-wrap">
		<div v-if="codeStore.loading" class="loading">
			<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
		</div>
		<div class="search">
			<u-search v-model="keyword" placeholder="输入标题搜索" shape="square" height="40px" :clearabled="true"
				:showAction="false" @search="onSearch" @clear="onClear"></u-search>
			<div class="code-type-list">
				<div v-for="item in codeTypes" :key="item.key" class="code-type-item">
					<div :class="`code-type ${langType === item.value ? 'active' : ''}`" @click="onActive(item)">
						{{ item.key }}
					</div>
				</div>
			</div>
		</div>
		<u-list lowerThreshold="10" height="calc(100vh - 100px)" :enable-flex="true" @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in codeStore.codeList" :key="index">
				<div class="code-item" @click="toDetail(item)">
					<div class="info">
						<div class="title-text">{{ item.title }}</div>
						<div class="language">{{ item.language }}</div>
					</div>
				</div>
			</u-list-item>
			<div v-if="noMore" class="no-more">没有更多了</div>
		</u-list>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import { useCodeStore } from "../../stores/code";
	import { CodeItem } from "../../typings";

	const codeStore = useCodeStore();

	const keyword = ref("");
	const langType = ref("");

	const codeTypes = [
		{
			key: "全部",
			value: "",
		},
		{
			key: "html",
			value: "html",
		},
		{
			key: "js",
			value: "javascript",
		},
		{
			key: "python",
			value: "python",
		},
		{
			key: "c",
			value: "c",
		},
	];

	const noMore = computed(() => {
		const { total, codeList, pageSize } = codeStore;
		return codeList.length >= total && codeList.length && total > pageSize;
	});

	onMounted(() => {
		loadMore();
	});

	const scrolltolower = () => {
		loadMore();
	};

	const loadMore = async () => {
		await codeStore.getCodeList(keyword.value, langType.value);
	};

	const onActive = async (item : { key : string; value : string }) => {
		langType.value = item.value;
		codeStore.init();
		await loadMore();
	};

	const onSearch = async () => {
		codeStore.init();
		await loadMore();
	};

	const onClear = async () => {
		codeStore.init();
		await loadMore();
	};

	const toDetail = (item : CodeItem) => {
		// @ts-ignore
		uni.navigateTo({
			url: `/pages/codesnippet/index?id=${item.id}`,
		});
	};
</script>

<style scoped lang="scss">
	@import "@/styles/index.scss";

	.code-wrap {
		position: relative;
		padding: 0 10px;
		box-sizing: border-box;
		background-color: $bg;
		min-height: 100vh;

		.search {
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			height: 100px;
			box-sizing: border-box;
			padding-bottom: 10px;

			.code-type-list {
				display: flex;
				height: 30px;
				border-radius: 5px;
				background-color: #f2f2f2;
				overflow: hidden;

				.code-type-item {
					display: flex;
					flex: 1;
					height: 100%;

					&::after {
						content: '';
						height: 20px;
						margin-top: 5px;
						width: 1px;
						display: inline-block;
						background-color: $bc;
					}

					&:last-child {
						&::after {
							content: none;
						}
					}

					.code-type {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						height: 100%;
						transition: all 0.3s ease-in-out;
					}

					.active {
						background-color: #5782ff;
						color: #fff;
					}
				}
			}
		}

		.loading {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
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
			box-sizing: border-box;
			border-bottom: 1px solid $bc;

			.info {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 5px;

				.title-text {
					flex: 1;
					font-size: 16px;
					height: 100%;
					padding: 10px 0;
					font-weight: 700;
					margin-right: 10px;
					@include ellipsis;
				}

				.language {
					font-size: 16px;
					color: #333;
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