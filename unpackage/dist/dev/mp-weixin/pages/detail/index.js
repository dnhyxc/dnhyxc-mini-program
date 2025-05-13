"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_article = require("../../stores/article.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_loading_icon + mpHtml)();
}
const mpHtml = () => "../../components/mp-html/mp-html.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const articleStore = stores_article.useArticleStore();
    const scrollIntoId = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    common_vendor.onLoad(async (options) => {
      const id = decodeURIComponent(options.scene);
      const articleId = !["undefined", "null"].includes(id) ? id : options == null ? void 0 : options.id;
      await articleStore.getDetail(articleId);
    });
    const onScroll = (e) => {
      scrollIntoId.value = "";
      scrollTop.value = e.detail.scrollTop;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(articleStore).detailLoading
      }, common_vendor.unref(articleStore).detailLoading ? {
        b: common_vendor.p({
          vertical: true,
          size: "38",
          text: "正在加载中",
          color: "#5782ff"
        })
      } : {
        c: common_vendor.p({
          content: common_vendor.unref(articleStore).html
        }),
        d: scrollIntoId.value,
        e: common_vendor.o(onScroll)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fd5b0a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/index.js.map
