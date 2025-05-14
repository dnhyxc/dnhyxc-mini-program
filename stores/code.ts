import { defineStore } from 'pinia';
import sanitizeHtml from 'sanitize-html';
import { request } from '../server'
import { CodeItem } from '../typings'
import { apiUrl } from '../constant'

interface IProps {
	pageNo : number,
	pageSize : number,
	total : number,
	loading : boolean,
	codeList : CodeItem[],
	detail : Partial<CodeItem>,
	detailLoading : boolean,
	html : string
}

export const useCodeStore = defineStore('code', {
	state: () : IProps => ({
		pageNo: 0,
		pageSize: 20,
		total: 0,
		loading: false,
		codeList: [],
		detail: {},
		detailLoading: false,
		html: ''
	}),
	actions: {
		init() {
			this.pageNo = 0
			this.pageSize = 20
			this.total = 0
			this.codeList = []
		},
		async getCodeList(keyword? : string) {
			try {
				if (this.codeList.length !== 0 && this.codeList.length >= this.total) return;
				this.pageNo = this.pageNo + 1;
				this.loading = true
				const res = await request<{ data : { list : CodeItem[], total : number }, success : boolean }>({
					url: `${apiUrl}/getCodeListByMiniProgram`,
					data: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						keyword,
						all: true
					}
				})
				this.loading = false;
				if (res?.success) {
					this.total = res.data.total;
					this.codeList = [...this.codeList, ...res.data.list];
				}
			} catch {
				this.loading = false
			}
		},
		async getCodeById(id : string) {
			try {
				this.detailLoading = true;
				const res = await request<{ data : CodeItem, success : boolean }>({
					url: `${apiUrl}/getCodeByIdByMiniProgram`,
					data: {
						id
					}
				})
				this.detailLoading = false;
				if (res.success) {
					this.detail = res.data
					const result = await request<{ data : string, success : boolean }>({
						url: `${apiUrl}/md2html`,
						data: {
							content: `\`\`\`${res.data.language}\n${res.data.content}\n\`\`\``,
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
});