<template>
	<view class="home-wrap">
		<div v-if="articleStore.loading" class="loading">
			<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
		</div>
		<div class="search">
			<u-search v-model="keyword" placeholder="输入标题搜索" shape="square" height="40px" :clearabled="true"
				:showAction="false" @search="onSearch" @clear="onClear"></u-search>
		</div>
		<u-list lowerThreshold="10" height="calc(100vh - 50px)" @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in articleStore.articleList" :key="index">
				<div class="article-item" @click="toDetail(item)">
					<div class="image-wrap">
						<image :src="item.coverImage" class="cover" />
					</div>
					<div class="info">
						<div class="title">{{item.title}}</div>
						<div class="desc">{{item.abstract}}</div>
					</div>
				</div>
			</u-list-item>
			<div v-if="noMore" class="no-more">没有更多了</div>
		</u-list>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';
	import { useArticleStore } from '../../stores/article'
	import { ArticleItem } from '../../typings';

	const articleStore = useArticleStore()

	const keyword = ref('')

	const noMore = computed(() => {
		const { total, articleList, pageSize } = articleStore
		return articleList.length >= total && articleList.length && total > pageSize
	})

	onMounted(() => {
		loadMore();
	})

	const scrolltolower = () => {
		loadMore();
	}

	const loadMore = async (keyword ?: string) => {
		await articleStore.getArticleList(keyword)
	}

	const onSearch = async (value : string) => {
		articleStore.init()
		await loadMore(value)
	}

	const onClear = async () => {
		articleStore.init()
		await loadMore()
	}


	const toDetail = (item : ArticleItem) => {
		// @ts-ignore
		uni.navigateTo({
			url: `/pages/detail/index?id=${item.id}` // 注意斜杠开头
		});
	}
</script>

<style scoped lang="scss">
	@import '@/styles/index.scss';

	.home-wrap {
		position: relative;
		padding: 0 10px;
		box-sizing: border-box;
		background-color: $bg;
		min-height: 100vh;

		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 50px;
			box-sizing: border-box;
		}

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

		.article-item {
			display: flex;
			align-items: center;
			padding: 10px 0;
			box-sizing: border-box;

			.image-wrap {
				background-color: #f5f5f5;
				height: 70px;
				width: auto;
				min-width: 70px;
				border-radius: 5px;
				margin-right: 10px;

				.cover {
					width: auto;
					height: 70px;
					min-width: 70px;
					object-fit: cover;
					border-radius: 5px; // 圆形裁剪
				}
			}

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 16px;
					font-weight: 700;
					margin-bottom: 10px;
					@include ellipsis;
				}

				.desc {
					font-size: 14px;
					@include ellipsisMore(2);
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