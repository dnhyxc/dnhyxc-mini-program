"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
if (!Math) {
  _easycom_u_loading_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const scrollIntoId = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    common_vendor.onMounted(() => {
    });
    const onScroll = (e) => {
      scrollIntoId.value = "";
      scrollTop.value = e.detail.scrollTop;
    };
    return (_ctx, _cache) => {
      return {
        b: scrollIntoId.value,
        c: common_vendor.o(onScroll)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae92b765"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/code/index.js.map
