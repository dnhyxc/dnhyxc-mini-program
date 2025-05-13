"use strict";
const components_mpHtml_latex_katex_min = require("./katex.min.js");
function Latex() {
}
Latex.prototype.onParse = function(node, vm) {
  if (!vm.options.editable && node.type === "text" && node.text.includes("$")) {
    const part = node.text.split(/(\${1,2})/);
    const children = [];
    let status = 0;
    for (let i = 0; i < part.length; i++) {
      if (i % 2 === 0) {
        if (part[i]) {
          if (status === 0) {
            children.push({
              type: "text",
              text: part[i]
            });
          } else {
            if (status === 1) {
              const nodes = components_mpHtml_latex_katex_min.parse.default(part[i]);
              children.push({
                name: "span",
                attrs: {},
                l: "T",
                f: "display:inline-block",
                children: nodes
              });
            } else {
              const nodes = components_mpHtml_latex_katex_min.parse.default(part[i], {
                displayMode: true
              });
              children.push({
                name: "div",
                attrs: {
                  style: "text-align:center"
                },
                children: nodes
              });
            }
          }
        }
      } else {
        if (part[i] === "$" && part[i + 2] === "$") {
          status = 1;
          part[i + 2] = "";
        } else if (part[i] === "$$" && part[i + 2] === "$$") {
          status = 2;
          part[i + 2] = "";
        } else {
          if (part[i] && part[i] !== "$$") {
            part[i + 1] = part[i] + part[i + 1];
          }
          status = 0;
        }
      }
    }
    delete node.type;
    delete node.text;
    node.name = "span";
    node.attrs = {};
    node.children = children;
  }
};
exports.Latex = Latex;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/mp-html/latex/index.js.map
