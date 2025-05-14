"use strict";
const common_vendor = require("../common/vendor.js");
const formatDate = (date, format = "YYYY/MM/DD HH:mm:ss") => {
  if (!date)
    return date;
  return common_vendor.hooks(date).format(format);
};
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/index.js.map
