"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_article = require("../../stores/article.js");
const utils_index = require("../../utils/index.js");
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
    common_vendor.onLoad(async (options) => {
      const id = decodeURIComponent(options.scene);
      const articleId = !["undefined", "null"].includes(id) ? id : options == null ? void 0 : options.id;
      await articleStore.getDetail(articleId);
    });
    const onHeadImgError = () => {
      articleStore.detail.headUrl = "";
    };
    const onCoverImgError = () => {
      articleStore.detail.coverImage = "";
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
      return common_vendor.e({
        a: common_vendor.unref(articleStore).detailLoading
      }, common_vendor.unref(articleStore).detailLoading ? {
        b: common_vendor.p({
          vertical: true,
          size: "38",
          text: "正在加载中",
          color: "#5782ff"
        })
      } : common_vendor.e({
        c: common_vendor.t((_b = (_a = common_vendor.unref(articleStore)) == null ? void 0 : _a.detail) == null ? void 0 : _b.title),
        d: (_d = (_c = common_vendor.unref(articleStore)) == null ? void 0 : _c.detail) == null ? void 0 : _d.headUrl
      }, ((_f = (_e = common_vendor.unref(articleStore)) == null ? void 0 : _e.detail) == null ? void 0 : _f.headUrl) ? {
        e: (_h = (_g = common_vendor.unref(articleStore)) == null ? void 0 : _g.detail) == null ? void 0 : _h.headUrl,
        f: common_vendor.o(onHeadImgError)
      } : {}, {
        g: common_vendor.t((_j = (_i = common_vendor.unref(articleStore)) == null ? void 0 : _i.detail) == null ? void 0 : _j.authorName),
        h: common_vendor.t(common_vendor.unref(utils_index.formatDate)((_l = (_k = common_vendor.unref(articleStore)) == null ? void 0 : _k.detail) == null ? void 0 : _l.createTime, "YYYY年MM月DD日 HH:mm")),
        i: common_vendor.t((_n = (_m = common_vendor.unref(articleStore)) == null ? void 0 : _m.detail) == null ? void 0 : _n.readCount),
        j: (_p = (_o = common_vendor.unref(articleStore)) == null ? void 0 : _o.detail) == null ? void 0 : _p.coverImage
      }, ((_r = (_q = common_vendor.unref(articleStore)) == null ? void 0 : _q.detail) == null ? void 0 : _r.coverImage) ? {
        k: (_t = (_s = common_vendor.unref(articleStore)) == null ? void 0 : _s.detail) == null ? void 0 : _t.coverImage,
        l: common_vendor.o(onCoverImgError)
      } : {}, {
        m: (_v = (_u = common_vendor.unref(articleStore)) == null ? void 0 : _u.detail) == null ? void 0 : _v.abstract,
        n: common_vendor.p({
          content: common_vendor.unref(articleStore).html
        })
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fd5b0a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/index.js.map
