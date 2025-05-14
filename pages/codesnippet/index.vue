<template>
	<div v-if="codeStore.detailLoading" class="detail-wrap-loading">
		<u-loading-icon vertical size="38" text="正在加载中" color="#5782ff"></u-loading-icon>
	</div>
	<scroll-view v-else enable-back-to-top enable-flex enable-passive class="detail-wrap" scroll-y="true">
		<div class=" title">{{ codeStore.detail.title }}</div>
		<mp-html :content="processedAbstract" style="line-height: 2em" />
		<mp-html :content="codeStore.html" style="line-height: 2em" />
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	// @ts-ignore
	import { onLoad } from "@dcloudio/uni-app";
	import { useCodeStore } from "../../stores/code";
	// @ts-ignore
	import mpHtml from "@/components/mp-html/mp-html.vue";

	const codeStore = useCodeStore();

	const scrollIntoId = ref<string>("");
	const scrollTop = ref<number>(0);

	const processedAbstract = computed(() => {
		if (!codeStore.detail.abstract) return "";
		return codeStore.detail.abstract.replace(
			/<code([^>]*)>/g,
			'<code$1 class="hljs-inline">'
		);
	});

	// 通过 options 获取路由跳转携带的参数
	onLoad(async (options) => {
		// 获取扫码进入的 scene 参数
		const id = decodeURIComponent(options.scene);
		const codeId = !["undefined", "null"].includes(id) ? id : options?.id;
		await codeStore.getCodeById(codeId);
	});

	const onScroll = (e : any) => {
		scrollIntoId.value = "";
		scrollTop.value = e.detail.scrollTop;
	};
</script>

<style scoped lang="scss">
	@import "@/styles/index.scss";

	.detail-wrap {
		background-color: $bg;
		padding: 15px;
		box-sizing: border-box;
		min-height: 100vh;

		.title {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 10px;
		}

		:deep {
			.u-textarea {
				background-color: #282c34 !important;
				overflow: auto;
			}

			.u-textarea__field {
				color: #fff !important;
				white-space: nowrap !important;
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

	.hl-pre {
		border-radius: 5px;
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