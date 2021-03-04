// 判断所有图标名的脚步
const path = require("path")
const fs = require('fs')

const files = fs.readdirSync(path.resolve(__dirname,'../../../assets/icon'))
files.forEach((filename,idx)=>{
    files[idx] = filename.replace('.svg','')
})

fs.writeFileSync('../../../views/elementDoc/single/ico/icons.js','export default ' + JSON.stringify(files))

console.log('图标名文件已生成')