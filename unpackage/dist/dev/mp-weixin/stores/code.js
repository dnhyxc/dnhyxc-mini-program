"use strict";
const common_vendor = require("../common/vendor.js");
const server_index = require("../server/index.js");
const constant_index = require("../constant/index.js");
const useCodeStore = common_vendor.defineStore("code", {
  state: () => ({
    pageNo: 0,
    pageSize: 20,
    total: 0,
    loading: false,
    codeList: [],
    detail: {},
    detailLoading: false,
    html: ""
  }),
  actions: {
    init() {
      this.pageNo = 0;
      this.pageSize = 20;
      this.total = 0;
    },
    async getCodeList() {
      try {
        if (this.codeList.length !== 0 && this.codeList.length >= this.total)
          return;
        this.pageNo = this.pageNo + 1;
        this.loading = true;
        const res = await server_index.request({
          url: `${constant_index.apiUrl}/getCodeListByMiniProgram`,
          data: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            all: true
          }
        });
        this.loading = false;
        if (res == null ? void 0 : res.success) {
          this.total = res.data.total;
          this.codeList = [...this.codeList, ...res.data.list];
        }
      } catch {
        this.loading = false;
      }
    },
    async getCodeById(id) {
      try {
        this.detailLoading = true;
        const res = await server_index.request({
          url: `${constant_index.apiUrl}/getCodeByIdByMiniProgram`,
          data: {
            id
          }
        });
        this.detailLoading = false;
        if (res.success) {
          this.detail = res.data;
          const result = await server_index.request({
            url: `${constant_index.apiUrl}/md2html`,
            data: {
              content: `\`\`\`${res.data.language}
${res.data.content}\`\`\``,
              options: {
                needKatex: false,
                // 是否需要转译数学公式
                lineNumber: true
                // 是否开启代码块行号
              }
            }
          });
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
            this.detailLoading = false;
            this.html = cleanHtml;
          } else {
            this.html = "";
          }
        }
      } catch {
        this.detailLoading = false;
      }
    }
  }
});
exports.useCodeStore = useCodeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/code.js.map
