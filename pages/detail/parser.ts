import { marked } from 'marked'
import hljs from 'highlight.js';
// import javascript from 'highlight.js/lib/languages/javascript'
// import typescript from 'highlight.js/lib/languages/typescript'
// import python from 'highlight.js/lib/languages/python'
// import java from 'highlight.js/lib/languages/java'
// import csharp from 'highlight.js/lib/languages/csharp'
// import bash from 'highlight.js/lib/languages/bash'
// import sql from 'highlight.js/lib/languages/sql'
// import json from 'highlight.js/lib/languages/json'
// import xml from 'highlight.js/lib/languages/xml'
// // import katex from 'katex';
// // import DOMPurify from 'dompurify';
// // import mermaid from 'mermaid';

// // 注册语言支持
// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('typescript', typescript)
// hljs.registerLanguage('python', python)
// hljs.registerLanguage('java', java)
// hljs.registerLanguage('csharp', csharp)
// hljs.registerLanguage('bash', bash)
// hljs.registerLanguage('sql', sql)
// hljs.registerLanguage('json', json)
// hljs.registerLanguage('xml', xml)

// const render = new marked.Renderer()
// marked.setOptions({
// 	renderer: render,
// 	gfm: true,
// 	pedantic: false,
// })

// const tokenizer = {
// 	codespan(src) {
// 		const match = src.match(/^\$+([^\$\n]+?)\$+/);
// 		if (match) {
// 			return {
// 				type: 'codespan',
// 				raw: match[0],
// 				text: match[1].trim()
// 			};
// 		}

// 		// return false to use original codespan tokenizer
// 		return false;
// 	}
// };

// const renderer = {
// 	code({ text, lang } : { text : string, lang : string }) {
// 		if (lang && hljs.getLanguage(lang)) {
// 			try {
// 				console.log(text, 'codecodecodecodecodecode', lang, hljs.highlight(text, { language: lang }).value)
// 				return `<pre><code class="hljs language-${lang}">${hljs.highlight(text, { language: lang }).value}</code></pre>`;
// 			} catch (e) {
// 				console.error(e);
// 			}
// 		}
// 		return `<pre><code class="hljs">${hljs.highlightAuto(text).value}</code></pre>`;
// 	},
// };

// marked.use({ renderer });

marked.setOptions({
	pedantic: false,
	gfm: true,
	breaks: false,
	renderer: new marked.Renderer(),
});

export const parserMarkdown = (markdown: string) => {
	return marked.parse(markdown)
}


// // utils/markdownParser.js
// const towxml = require('../../wxcomponents/towxml/index.js')

// // 初始化 Towxml（配置高亮、表情等）
// // const towxml = new Towxml({
// // 	base: 'https://your-cdn.com',  // 静态资源 CDN（如图片）
// // 	theme: 'light',                // 主题：light/dark
// // 	events: {}                     // 自定义事件（如点击回调）
// // });

// export function parseMarkdown(content : string) {
// 	return towxml(content, 'markdown');
// }