import { defineStore } from 'pinia';
import { request } from '../server'
import sanitizeHtml from 'sanitize-html';
import { ArticleItem } from '../typings/index'

interface IProps {
	pageNo : number,
	pageSize : number,
	total : number,
	loading : boolean,
	articleList : ArticleItem[],
	detail : Omit<ArticleItem, 'id'>,
	detailLoading : boolean,
	html : string
}

const url = 'http://localhost:9112/api'
// const url = 'https://www.dnhyxc.cn/api'

export const useArticleStore = defineStore('article', {
	state: () : IProps => ({
		pageNo: 0,
		pageSize: 20,
		total: 0,
		loading: false,
		articleList: [],
		detail: {},
		detailLoading: false,
		html: ''
	}),
	actions: {
		init() {
			this.pageNo = 0
			this.pageSize = 20
			this.total = 0
			this.articleList = []
		},
		async getArticleList() {
			try {
				if (this.articleList.length !== 0 && this.articleList.length >= this.total) return;
				this.pageNo = this.pageNo + 1;
				this.loading = true
				const res = await request<{ data : { list : ArticleItem[], total : number }, success : boolean }>({
					url: `${url}/articleList`,
					data: {
						pageNo: this.pageNo,
						pageSize: this.pageSize
					}
				})
				this.loading = false;
				if (res?.success) {
					this.total = res.data.total;
					this.articleList = [...this.articleList, ...res.data.list];
				}
			} catch {
				this.loading = false
			}
		},
		async getDetail(id : string) {
			try {
				this.detailLoading = true;
				const res = await request<{ data : ArticleItem, success : boolean }>({
					url: `${url}/articleDetail`,
					// url: 'https://www.dnhyxc.cn/api/articleDetail',
					data: {
						id
					}
				})
				this.detail = res.data
				if (res.success) {
					const result = await request<{ data : string, success : boolean }>({
						url: `${url}/md2html`,
						data: {
							content: res.data.content,
							options: {
								needKatex: false, // 是否需要转译数学公式
								lineNumber: true // 是否开启代码块行号
							}
						}
					})
					if (result.success) {
						const cleanHtml = sanitizeHtml(result.data, {
							allowedTags: false,
							transformTags: {
								iframe: 'div',
								script: 'p',
							},
							allowedAttributes: false,
							allowVulnerableTags: true, // 明确允许危险标签
						});
						this.detailLoading = false;
						this.html = cleanHtml
					} else {
						this.html = ''
					}
				}
			} catch {
				this.detailLoading = false
			}
		}
	},
	getters: {
		// audios: (state) => state.audios,
		// audioKeys: (state) => state.audioKeys
	},
});