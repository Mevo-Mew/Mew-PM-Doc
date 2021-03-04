// 修改自 highlight.js ，官网 highlightjs.org

import coder from './coder'
// 开启或关闭语言
// coder.registerLanguage('css', require('./languages/css'));
// coder.registerLanguage('java', require('./languages/java'));
// coder.registerLanguage('php', require('./languages/php'));
// coder.registerLanguage('json', require('./languages/json'));
coder.registerLanguage('xml', require('./languages/xml')) // 与 HTML 通用
coder.registerLanguage('javascript', require('./languages/javascript'))
coder.registerLanguage('scss', require('./languages/scss'))

// 风格样式
import './scss/qtcreator_light.scss'

// 统一样式
import './hljs.scss'

export default coder.plugin