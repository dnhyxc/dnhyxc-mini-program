<template>
	<div v-if="articleStore.detailLoading" class="detail-wrap-loading">
		<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
	</div>
	<scroll-view v-else enable-back-to-top enable-flex enable-passive class="detail-wrap" scroll-y="true">
		<div class="title-wrap">
			<div class="title">{{ articleStore?.detail?.title }}</div>
			<div class="user-info">
				<image v-if="articleStore?.detail?.headUrl" :src="articleStore?.detail?.headUrl" class="herd-img"
					@error="onHeadImgError" />
				<div class="create-info">
					<div class="username">
						<span>{{ articleStore?.detail?.authorName }}</span>
					</div>
					<div>
						<span>{{ formatDate(articleStore?.detail?.createTime!, 'YYYY年MM月DD日 HH:mm') }}</span>
						<span class="read-count">阅读 {{ articleStore?.detail?.readCount }}</span>
					</div>
				</div>
			</div>
			<image v-if="articleStore?.detail?.coverImage" :src="articleStore?.detail?.coverImage" class="image"
				@error="onCoverImgError" />
			<p class="desc" v-html="articleStore?.detail?.abstract" />
		</div>
		<mp-html :content="articleStore.html" style="line-height: 2em;" />
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	// @ts-ignore
	import { onLoad } from "@dcloudio/uni-app";
	import { useArticleStore } from "../../stores/article";
	import { formatDate } from '../../utils'
	// @ts-ignore
	import mpHtml from '@/components/mp-html/mp-html.vue'

	const articleStore = useArticleStore();

	// 通过 options 获取路由跳转携带的参数
	onLoad(async (options) => {
		// 获取扫码进入的 scene 参数
		const id = decodeURIComponent(options.scene);
		const articleId = !['undefined', 'null'].includes(id) ? id : options?.id
		await articleStore.getDetail(articleId);
	});

	const onHeadImgError = () => {
		articleStore.detail.headUrl = ''
	}

	const onCoverImgError = () => {
		articleStore.detail.coverImage = ''
	}
</script>

<style scoped lang="scss">
	@import "@/styles/index.scss";

	.detail-wrap {
		background-color: $bg;
		padding: 15px;
		box-sizing: border-box;
		min-height: 100vh;


		.title-wrap {
			width: 100%;
			box-sizing: border-box;

			.title {
				font-size: 20px;
				font-weight: 600;
				margin-bottom: 15px;
				word-break: break-all;
			}

			.user-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 20px;

				.herd-img {
					width: 60px;
					height: 60px;
					border-radius: 60px;
					margin-right: 10px;
				}

				.create-info {
					display: flex;
					flex-direction: column;
					justify-content: center;

					.username {
						display: flex;
						align-items: center;
						font-size: 16px;
						font-weight: 600;
						margin-bottom: 10px;
					}

					.read-count {
						margin: 0 15px;
					}
				}
			}

			.image {
				width: 100%;
				height: 180px;
				object-fit: cover;
				border-radius: 5px;
			}

			.desc {
				margin-top: 10px;
				margin-bottom: 30px;
				white-space: pre-wrap;
				color: #282c34;
				font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
					Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
				-webkit-font-smoothing: antialiased;
			}
		}

	}

	.detail-wrap-loading {
		height: 100vh;
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

<style>
	/* 
		注意：
			这里对 rich-text 中内容不同通过标签名设置样式，通过标签名设置样式不会生效。
			需要通过类名进行设置。
	*/
	.head {
		padding: 10px 0 8px;
	}

	.custom-alert {
		background-color: #cbefff;
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px 0;
		border: 1px solid #abb2bf;
	}

	.alert-title {
		color: #455a64;
		font-weight: 600;
	}

	.alert-content {
		color: #455a64;
	}

	.abstract {
		background-color: #d1eefb;
		border: 1px solid #02b1ff;
	}

	.abstract .alert-title,
	.abstract .alert-content {
		color: #02b1ff;
	}

	.bug {
		background-color: #ffd3e2;
		border: 1px solid #f60357;
	}

	.bug .alert-title,
	.bug .alert-content {
		color: #f60357;
	}

	.caution {
		background-color: #ffe7c4;
		border: 1px solid #ffa726;
	}

	.caution .alert-title,
	.caution .alert-content {
		color: #ffa726;
	}

	.danger {
		background-color: #ffe4e4;
		border: 1px solid #ff5252;
	}

	.danger .alert-title,
	.danger .alert-content {
		color: #ff5252;
	}

	.error {
		background-color: #ffd8d8;
		border: 1px solid #d32f2f;
	}

	.error .alert-title,
	.error .alert-content {
		color: #d32f2f;
	}

	.example {
		background-color: #e3d8ff;
		border: 1px solid #7c4dff;
	}

	.example .alert-title,
	.example .alert-content {
		color: #7c4dff;
	}

	.failure {
		background-color: #ffd9d9;
		border: 1px solid #c2185b;
	}

	.failure .alert-title,
	.failure .alert-content {
		color: #c2185b;
	}

	.hint {
		background-color: #cdf4f0;
		border: 1px solid #009688;
	}

	.hint .alert-title,
	.hint .alert-content {
		color: #009688;
	}

	.custom-alert-header {
		border-radius: 5px;
		padding: 5px;
	}

	.info {
		background-color: #e3e3e3;
		border: 1px solid #333;
	}

	.info .alert-title,
	.info .alert-content {
		color: #333;
	}

	.note {
		background-color: #d5e2f9;
		border: 1px solid #448aff;
	}

	.note .alert-title,
	.note .alert-content {
		color: #448aff;
	}

	.question {
		background-color: #fff1dd;
		border: 1px solid #f0b400;
	}

	.question .alert-title,
	.question .alert-content {
		color: #f0b400;
	}

	.quote {
		background-color: #f0f0f0;
		border: 1px solid #9e9e9e;
	}

	.quote .alert-title,
	.quote .alert-content {
		color: #9e9e9e;
	}

	.success {
		background-color: #c1f1d5;
		border: 1px solid #00c852;
	}

	.success .alert-title,
	.success .alert-content {
		color: #00c852;
	}

	.tip {
		background-color: #e6e6e6;
		border: 1px solid #666;
	}

	.tip .alert-title,
	.tip .alert-content {
		color: #666;
	}

	.warning {
		background-color: #ffe9cc;
		border: 1px solid #ff9104;
	}

	.warning .alert-title,
	.warning .alert-content {
		color: #ff9104;
	}

	span[class="katex-html"][aria-hidden="true"] {
		display: none;
	}

	.table {
		border: 1px solid #ccc;
		border-spacing: 0;
		border-radius: 5px;
		border-collapse: collapse;
	}

	.table .td {
		border: 1px solid #ccc;
		padding: 0 3px;
	}

	.table .th {
		border: 1px solid #ccc;
		padding: 0 3px;
	}

	.code-container {
		position: relative;
		background-color: #282c34;
		padding: 25px 10px 10px;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.code-content {
		border-radius: 5px;
		overflow-x: auto;
	}

	.code-title {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 25px;
		color: #ccc;
		font-size: 12px;
		padding-right: 10px;
	}

	.code-flag {
		flex: 1;
		display: flex;
		align-items: center;
		height: 100%;
		margin-right: 20px;
		padding-left: 20px;
	}

	.code-flag .flag {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: red;
	}

	.code-flag .first-flag {
		background-color: #ec6a6b;
	}

	.code-flag .secend-flag {
		background-color: #f4bf4f;
		margin: 0 5px;
	}

	.code-flag .third-flag {
		background-color: #61c554;
	}

	.code-line {
		display: flex;
		justify-content: flex-start;
		line-height: 1.5em;
	}

	.line-number {
		padding-right: 10px;
		text-align: right;
		color: #999;
		user-select: none;
	}

	.hljs {
		color: #abb2bf;
		background: #282c34;
		padding-right: 10px;
	}

	.hljs-inline {
		color: #2bb91b;
		line-height: 1em;
		padding: 2px 5px 3px;
		background-color: #f5f5f5;
	}

	.hljs-comment,
	.hljs-quote {
		color: #5c6370;
		font-style: italic;
	}

	.hljs-quote {
		border-left: 3px solid #abb2bf;
		background-color: #f5f5f5;
		border-radius: 5px;
		padding-left: 5px;
		margin: 5px 0;
	}

	.hljs-doctag,
	.hljs-keyword,
	.hljs-formula {
		color: #c678dd;
	}

	.hljs-section,
	.hljs-name,
	.hljs-selector-tag,
	.hljs-deletion,
	.hljs-subst {
		color: #e06c75;
	}

	.hljs-literal {
		color: #56b6c2;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta .hljs-string {
		color: #98c379;
	}

	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-type,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-number {
		color: #d19a66;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-title {
		color: #61aeee;
	}

	.hljs-built_in,
	.hljs-title.class_,
	.hljs-class .hljs-title {
		color: #e6c07b;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}
</style>