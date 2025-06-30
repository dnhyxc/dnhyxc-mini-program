"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_code = require("../../stores/code.js");
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
    const codeStore = stores_code.useCodeStore();
    common_vendor.ref("");
    common_vendor.ref(0);
    common_vendor.onLoad(async (options) => {
      const id = decodeURIComponent(options.scene);
      const codeId = !["undefined", "null"].includes(id) ? id : options == null ? void 0 : options.id;
      await codeStore.getCodeById(codeId);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(codeStore).detailLoading
      }, common_vendor.unref(codeStore).detailLoading ? {
        b: common_vendor.p({
          vertical: true,
          size: "38",
          text: "正在加载中",
          color: "#5782ff"
        })
      } : {
        c: common_vendor.t(common_vendor.unref(codeStore).detail.title),
        d: common_vendor.p({
          content: common_vendor.unref(codeStore).html
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe1e7331"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/codesnippet/index.js.map
