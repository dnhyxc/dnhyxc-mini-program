"use strict";
const common_vendor = require("../common/vendor.js");
const server_index = require("../server/index.js");
const constant_index = require("../constant/index.js");
const useArticleStore = common_vendor.defineStore("article", {
  state: () => ({
    pageNo: 0,
    pageSize: 20,
    total: 0,
    loading: false,
    articleList: [],
    detail: {},
    detailLoading: false,
    html: ""
  }),
  actions: {
    init() {
      this.pageNo = 0;
      this.pageSize = 20;
      this.total = 0;
      this.articleList = [];
    },
    async getArticleList(filter) {
      try {
        if (this.articleList.length !== 0 && this.articleList.length >= this.total)
          return;
        this.pageNo = this.pageNo + 1;
        this.loading = true;
        const res = await server_index.request({
          url: `${constant_index.apiUrl}/articleList`,
          data: {
            filter,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        });
        this.loading = false;
        if (res == null ? void 0 : res.success) {
          this.total = res.data.total;
          this.articleList = [...this.articleList, ...res.data.list];
        }
      } catch {
        this.loading = false;
      }
    },
    async getDetail(id) {
      try {
        this.detailLoading = true;
        const res = await server_index.request({
          url: `${constant_index.apiUrl}/articleDetail`,
          // url: 'https://www.dnhyxc.cn/api/articleDetail',
          data: {
            id
          }
        });
        if (res.success) {
          this.detail = res.data;
          const result = await server_index.request({
            url: `${constant_index.apiUrl}/md2html`,
            data: {
              content: res.data.content,
              options: {
                needKatex: false,
                // 是否需要转译数学公式
                lineNumber: true
                // 是否开启代码块行号
              }
            }
          });
          this.detailLoading = false;
          if (result.success) {
            const cleanHtml = common_vendor.sanitizeHtml(result.data, {
              allowedTags: false,
              transformTags: {
                iframe: "div",
                script: "p"
              },
              allowedAttributes: false,
              allowVulnerableTags: true
              // 明确允许危险标签
            });
            this.html = cleanHtml;
          } else {
            this.html = "";
          }
        } else {
          this.detailLoading = false;
        }
      } catch {
        this.detailLoading = false;
      }
    }
  },
  getters: {
    // audios: (state) => state.audios,
    // audioKeys: (state) => state.audioKeys
  }
});
exports.useArticleStore = useArticleStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/article.js.map
