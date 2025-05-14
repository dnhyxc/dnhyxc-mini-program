"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_code = require("../../stores/code.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_list_item2 = common_vendor.resolveComponent("u-list-item");
  const _easycom_u_list2 = common_vendor.resolveComponent("u-list");
  (_easycom_u_loading_icon2 + _easycom_u_search2 + _easycom_u_list_item2 + _easycom_u_list2)();
}
const _easycom_u_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_list_item = () => "../../node-modules/uview-plus/components/u-list-item/u-list-item.js";
const _easycom_u_list = () => "../../node-modules/uview-plus/components/u-list/u-list.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_search + _easycom_u_list_item + _easycom_u_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const codeStore = stores_code.useCodeStore();
    const keyword = common_vendor.ref("");
    const noMore = common_vendor.computed(() => {
      const { total, codeList, pageSize } = codeStore;
      return codeList.length >= total && codeList.length && total > pageSize;
    });
    common_vendor.onMounted(() => {
      loadMore();
    });
    const scrolltolower = () => {
      loadMore();
    };
    const loadMore = async (keywrod) => {
      await codeStore.getCodeList(keywrod);
    };
    const onSearch = async (value) => {
      codeStore.init();
      await loadMore(value);
    };
    const onClear = async () => {
      codeStore.init();
      await loadMore();
    };
    const toDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/codesnippet/index?id=${item.id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(codeStore).loading
      }, common_vendor.unref(codeStore).loading ? {
        b: common_vendor.p({
          vertical: true,
          size: "38",
          text: "正在加载中",
          color: "#5782ff"
        })
      } : {}, {
        c: common_vendor.o(onSearch),
        d: common_vendor.o(onClear),
        e: common_vendor.o(($event) => keyword.value = $event),
        f: common_vendor.p({
          placeholder: "输入标题搜索",
          shape: "square",
          height: "40px",
          clearabled: true,
          showAction: false,
          modelValue: keyword.value
        }),
        g: common_vendor.f(common_vendor.unref(codeStore).codeList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.language),
            c: common_vendor.o(($event) => toDetail(item), index),
            d: index,
            e: "ae92b765-3-" + i0 + ",ae92b765-2"
          };
        }),
        h: noMore.value
      }, noMore.value ? {} : {}, {
        i: common_vendor.o(scrolltolower),
        j: common_vendor.p({
          lowerThreshold: "10",
          height: "calc(100vh - 50px)",
          ["enable-flex"]: true
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae92b765"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/code/index.js.map
