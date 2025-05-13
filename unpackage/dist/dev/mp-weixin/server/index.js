"use strict";
const common_vendor = require("../common/vendor.js");
const request = ({
  method = "POST",
  url,
  data,
  callback
}) => {
  try {
    return new Promise((resolve, reject) => {
      common_vendor.wx$1.request({
        url,
        method,
        data,
        success: (res) => {
          resolve(res.data);
          callback && callback(res.data);
        },
        fail: (error) => {
          reject(error);
          callback && callback(error);
        },
        complete: () => {
        }
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/server/index.js.map
